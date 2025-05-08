import os.path
from flask import Flask, request, jsonify
from g4f.client import Client
from g4f.cookies import set_cookies_dir, read_cookie_files

import json

app = Flask(__name__)

# Initialize the GPT Client
client = Client()
import g4f.debug
g4f.debug.logging = True
# Set the directory where .har file is stored
cookies_dir = os.path.join(os.path.dirname(__file__), "har_and_cookies")
set_cookies_dir(cookies_dir)

# Load the cookies from the .har file
read_cookie_files(cookies_dir)

# Define system message for GPT
system_message = {
    "role": "system",
    "content": (
        "You are an expert agricultural assistant specialized in generating fertilizer schedules in Sri Lankan agriculture. "
        "You will be given input based on {crop_type}, {soil_condition}, {planting_date}, {area_size}in hectares and {weather_forecast}. "
        "Your task is to provide a detailed fertilizer schedule in JSON format, specifying the stages of plant growth, the types of fertilizers to be used, the application amounts, "
        "and the recommended dates for application in this format: "
        "{"
        "schedule: {"
            "fertilizer_schedule: {"
                "crop_type: crop_type, give the stage name in lowercase format,please don't give in Uppercase or capitalized,"
                "planting_date: planting_date"","
                "estimated_harveting_date: harveting_date"","
                "estimated_total_cost: total_cost"","
                "area_size: area_size"","
                "soil_condition: {"
                    "pH: pH_value,"
                    "nitrogen: nitrogen_content"
                "},"
                "weather_forecast: weather_forecast,"
                "growth_stages: ["
                    "{"
                        "stage: stage, give the stage name in Capitalized format,please don't give in Uppercase or Lowercase,"
                        "application_date: application_date,"
                        "fertilizer_type: fertilizer_type,"
                        "amount: amount,"
                        "cost: cost,this cost should allign with sri lanka's current market prices"
                        "notes: Provide extra notes for farmers. Include information on potential crop diseases relevant to this stage and how to prevent them."

                    "}"
                "]"
            "}"
        "}"
        "}"
        "Ensure that the schedule is practical and tailored to the specific needs of the crop and conditions provided based on Sri Lankan agriculture."
        "Once the farmer has provided the input, you will generate the fertilizer schedule based on the given information. "
        "If the farmer regenerates with the same input, you should not generate anything again. "
        "If the farmer regenerates with different input, you will generate a different fertilizer schedule."
    )
}

@app.route('/generate_schedule', methods=['POST'])
def generate_schedule():
    data = request.json  # Extract the JSON input data
    print("Received data:", data)

    # Create the user input message for GPT
    user_input = {
        "role": "user",
        "content": (
            "Generate the fertilizer schedule based on the provided input as instructions with all the possible stages,give at least 5 stages. All the details should align with the current economy and state of Sri Lankan agriculture. Only provide the fertilizer schedule in JSON format, without any additional comments."            "Here is the input: "
            f"Crop type: {data.get('crop_type')}, "
            f"Planting date: {data.get('planting_date')}, "
            f"Area size: {data.get('area_size')}, "
            f"Soil condition: {data.get('soil_condition')}, "
            f"Weather forecast: {data.get('weather_forecast')}"

        )
    }

    try:
        # Call the GPT API
        response = client.chat.completions.create(
            model="gpt-4o",
            messages=[system_message, user_input]
        )

        # Extract GPT response content
        gpt_response_content = response.choices[0].message.content

        # Clean the content to remove any extra formatting
        if gpt_response_content.startswith("```json"):
            gpt_response_content = gpt_response_content[7:-3]  # Remove ```json at the start and ``` at the end
        
        # Attempt to parse the response content as JSON
        try:
            parsed_response = json.loads(gpt_response_content)
            return jsonify(parsed_response)
        except json.JSONDecodeError:
            # If JSON decoding fails, return the raw response content
            return jsonify({"response": gpt_response_content})

    except Exception as e:
        # Log any other errors
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

    
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8000, debug=True)
