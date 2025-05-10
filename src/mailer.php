<?php
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_USER', 'spectral617@gmail.com');
define('SMTP_PASS', 'pippo1234-');
define('SMTP_PORT', 587); 
define('FROM_EMAIL', 'brambillagianluca@itis-molinari.eu');
define('FROM_NAME', 'Gianluca');

function sendEmail($to, $subject, $message) {
    $headers = "From: " . FROM_NAME . " <" . FROM_EMAIL . ">\r\n";
    $headers .= "Reply-To: " . FROM_EMAIL . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    if(mail($to, $subject, $message, $headers)) {
        return true;
    } else {
        return false;
    }
}

function sendRegistrationEmail($userEmail) {
    $subject = "Welcome to Our Platform!";
    $message = "<h1>Thank you for registering!</h1><p>We are glad to have you on board.</p>";
    
    return sendEmail($userEmail, $subject, $message);
}


function sendDraftApprovalEmail($moderatorEmail) {
    $subject = "Draft Approval Needed";
    $message = "<h1>New Draft Submitted</h1><p>A new draft is ready for your review.</p>";
    
    return sendEmail($moderatorEmail, $subject, $message);
}

function sendCandidatureEmail($adminEmail) {
    $subject = "New Candidature Received";
    $message = "<h1>New Candidature Alert</h1><p>A new candidature has been submitted for your review.</p>";
    
    return sendEmail($adminEmail, $subject, $message);
}
