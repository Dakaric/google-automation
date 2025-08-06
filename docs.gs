function createDocument(params) {
  try {
    if (!params.title || !params.body) {
      return { error: 'Missing parameters' };
    }
    var doc = DocumentApp.create(params.title);
    doc.getBody().setText(params.body);
    return { documentId: doc.getId(), url: doc.getUrl() };
  } catch (err) {
    return { error: err.message };
  }
}