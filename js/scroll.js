
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Smooth scrolling effect
    });
}
// Get the modal
function navigateToPage() {
    window.location.href = 'jci_app.html'; // Change 'other-page.html' to your target page
}
function navigateToHealthPage() {
    window.location.href = 'health_app.html'; // Change 'other-page.html' to your target page
}
function navigateToKarhatyPage() {
    window.location.href = 'karhabti.app.html'; // Change 'other-page.html' to your target page
}
function downloadStaticFile(filePath, fileName) {
    // Create an anchor element
    const link = document.createElement('a');
    
    // Set the href attribute to the relative path of the file
    link.href = filePath;
    
    // Set the download attribute to specify the file name
    link.download = fileName;
    
    // Append the anchor to the body (needed for Firefox)
    document.body.appendChild(link);
    
    // Programmatically click the link to trigger the download
    link.click();
    
    // Remove the link from the DOM
    document.body.removeChild(link);
}
function openGmailCompose(to, subject, body) {
    // Encode the parameters to ensure they are URL-safe
    const encodedTo = encodeURIComponent(to);
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Construct the Gmail compose URL
    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;

    // Open the URL in a new tab
    window.open(gmailComposeUrl, '_blank');
}