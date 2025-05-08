import React from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, View } from 'react-native';

const MarketPriceTable= () => {
  // Inject JavaScript to display only the .article-content section
  // const injectedJavaScript = `
  //   // Hide all elements initially
  //   document.body.style.display = 'none';
    
  //   // Show only the element with the class 'article-content'
  //   var targetSection = document.querySelector('.article-content');
    
  //   if (targetSection) {
  //     targetSection.style.display = 'block';
  //     document.body.style.display = 'block'; // Ensure body is visible again
  //   } else {
  //     document.body.innerHTML = '<h1>Content Not Found</h1>';
  //   }
  //   true; // Required for the WebView to run the JS
  // `;

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'http://www.statistics.gov.lk/DashBoard/Prices/' }} // URL of the website
        // injectedJavaScript={injectedJavaScript} // Inject JS to manipulate the page
        // style={{ flex: 1 }}
      />
    </View>
  );
};

export default MarketPriceTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
