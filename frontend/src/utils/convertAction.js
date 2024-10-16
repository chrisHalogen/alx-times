export default function convertActionToLink(inputData) {
  // Base URL for the article view links
  const baseUrl = "/articles/view";

  // Step 1: Update the action field in each data item
  inputData.data = inputData.data.map((item) => {
    return {
      ...item,
      action: `/account/articles/view/${item.action}`, // Convert action to link
    };
  });

  return inputData;
}
