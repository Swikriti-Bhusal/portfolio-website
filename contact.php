<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect & sanitize inputs
    $name    = htmlspecialchars(trim($_POST['name']));
    $email   = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $subject = htmlspecialchars(trim($_POST['subject']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Your email address
    $to = "swikritibhusal07@gmail.com"; 
    $fullSubject = !empty($subject) ? $subject : "New message from portfolio";

    // Email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n\n";
    $body .= "Message:\n$message\n";

    // Headers
    $headers = "From: $name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email
    if (mail($to, $fullSubject, $body, $headers)) {
        echo "<p>Thank you! Your message has been sent.</p>";
    } else {
        echo "<p>Sorry, there was a problem sending your message.</p>";
    }
} else {
    echo "<p>Invalid request.</p>";
}
?>
