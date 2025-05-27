function redirectToGmail(to, subject, body) {
    // Encode parameters for the URL
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Construct the mailto link
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodedSubject}&body=${encodedBody}`;

    // Redirect to Gmail
    window.location.href = mailtoLink;
}
