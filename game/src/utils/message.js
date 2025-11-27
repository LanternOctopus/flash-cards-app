async function triggerInteraction(interactionType, interactionId) {
    window.parent.postMessage({ interactionType, interactionId }, "*");
    console.log('Sent message:', { interactionType, interactionId });
    const response = await waitForMessage('interactionResult');
    console.log('Got response:', response);
}

export default triggerInteraction;

// In your game JS, e.g., main.js
function waitForMessage(expectedType) {
  return new Promise((resolve) => {
    function handler(event) {
      const data = event.data;
      if (data?.type === expectedType) {
        window.removeEventListener('message', handler);
        console.log('Received message:', data);
        resolve(data);
      }
    }
    window.addEventListener('message', handler);
  });
}
