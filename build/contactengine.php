<?php

$EmailFrom = $Email;
$EmailTo = "onlinecrewph@gmail.com";
$Subject = "OnlineCrew Designs Form";
$Select = Trim(stripcslashes($_POST['Select']));
$Name = Trim(stripslashes($_POST['Name'])); 
$Phone = Trim(stripslashes($_POST['Phone'])); 
$Email = Trim(stripslashes($_POST['Email'])); 
$Message = Trim(stripslashes($_POST['Message'])); 

// validation
$validationOK=true;
if (!$validationOK) {
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
  exit;
}

// prepare email body text
$Body = "";
$Body .= "How can we help you? ";
$Body .= $Select;
$Body .= "\n";
$Body .= "Name: ";
$Body .= $Name;
$Body .= "\n";
$Body .= "Phone: ";
$Body .= $Phone;
$Body .= "\n";
$Body .= "Email: ";
$Body .= $Email;
$Body .= "\n";
$Body .= "Message: ";
$Body .= $Message;
$Body .= "\n";

// send email 
$success = mail($EmailTo, $Subject, $Body, "From: <$EmailFrom>");

// redirect to success page 
if ($success){
  print "<meta http-equiv=\"refresh\" content=\"0;URL=thanks\">";
}
else{
  print "<meta http-equiv=\"refresh\" content=\"0;URL=error.htm\">";
}
?>