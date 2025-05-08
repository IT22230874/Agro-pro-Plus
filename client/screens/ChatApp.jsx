import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  StyleSheet, 
  Alert,
  Modal,
} from 'react-native';

// Dummy data for chat list
const initialChatListData = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
  { id: '3', name: 'Charlie' },
  { id: '4', name: 'Diana' },
];

const ChatApp = () => {
  const [chatListData, setChatListData] = useState(initialChatListData);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [newChatName, setNewChatName] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  // Handle sending a message
  const sendMessage = () => {
    if (input.trim() && selectedChat) {
      const newMessage = { id: Date.now().toString(), text: input, sender: 'user' };
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage],
      }));
      setInput('');
    }
  };

  // Go back to the chat list
  const goBackToChatList = () => {
    setSelectedChat(null);
  };

  // Delete chat confirmation
  const handleDeleteChat = (chatId) => {
    Alert.alert(
      'Delete Chat',
      'Are you sure you want to delete this chat?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteChat(chatId) },
      ],
      { cancelable: true }
    );
  };

  // Delete the chat
  const deleteChat = (chatId) => {
    setChatListData(chatListData.filter((chat) => chat.id !== chatId));
    setMessages((prevMessages) => {
      const newMessages = { ...prevMessages };
      delete newMessages[chatId];
      return newMessages;
    });
  };

  // Open new chat modal
  const startNewChat = () => {
    setModalVisible(true);
  };

  // Add a new chat to the chat list
  const addNewChat = () => {
    if (newChatName.trim()) {
      const newChat = { id: Date.now().toString(), name: newChatName };
      setChatListData([newChat, ...chatListData]);
      setNewChatName('');
      setModalVisible(false);
    }
  };

  // Render the chat list
  const renderChatList = () => (
    <View style={styles.chatListContainer}>
      <Text style={styles.headerText}>Chat List</Text>
      <FlatList
        data={chatListData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.chatItemContainer}>
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => setSelectedChat(item.id)}
            >
              <Text style={styles.chatItemText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.moreOptionsButton}
              onPress={() => handleDeleteChat(item.id)}
            >
              <Text style={styles.moreOptionsText}>⋮</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* Button to start a new chat */}
      <TouchableOpacity style={styles.newChatButton} onPress={startNewChat}>
        <Text style={styles.newChatButtonText}>Start New Chat</Text>
      </TouchableOpacity>

      {/* Modal for starting a new chat */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Start New Chat</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter name"
              value={newChatName}
              onChangeText={setNewChatName}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addNewChat}>
              <Text style={styles.modalButtonText}>Add Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );

  // Render the chat screen for a selected user
  const renderChatScreen = () => (
    <View style={styles.chatContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBackToChatList}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>
          {chatListData.find((chat) => chat.id === selectedChat)?.name}
        </Text>
      </View>
      <FlatList
        data={messages[selectedChat] || []}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'user' ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {selectedChat ? renderChatScreen() : renderChatList()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#004d00', // Dark green header
  },
  backButton: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  chatListContainer: {
    flex: 1,
    padding: 20,
  },
  chatItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#e6ffe6',
    borderRadius: 8,
    marginBottom: 10,
  },
  chatItem: {
    flex: 1,
  },
  chatItemText: {
    fontSize: 18,
    color: '#333333',
  },
  moreOptionsButton: {
    padding: 10,
  },
  moreOptionsText: {
    fontSize: 20,
    color: '#666666',
  },
  newChatButton: {
    backgroundColor: '#617F0F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  newChatButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  chatContainer: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 10
  },
  messageList: {
    paddingBottom: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: '#007BFF', // Use your theme color
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#e2e2e2', // Light gray for bot messages
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#CCCCCC',
  },
  input: {
    flex: 1,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    marginRight: 10,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  sendButton: {
    backgroundColor: '#617F0F',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  sendButtonText: {
    color: '#617F0F',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalInput: {
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalCancelButton: {
    backgroundColor: '#CCCCCC',
  },
});

export default ChatApp;
