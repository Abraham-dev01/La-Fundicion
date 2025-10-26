<?
$date = $_REQUEST["date"];
$name  = $_REQUEST["name"];
$email = $_REQUEST["email"];
$phone  = $_REQUEST["phone"];
$msg   = $_REQUEST["msg"];
$to    = "jthemesonline@gmail.com";
if (isset($email) && isset($name) && isset($msg)) {
    $email_subject = "$name sent you a message via Testo (Booking Form)";
		$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= "From: ".$name." <".$email.">\r\n"."Reply-To: ".$email."\r\n" ;
$msg     = "Date: $date <br/> Name: $name <br/> Email: $email <br/> Phone Number: $phone <br/> Message: $msg";
   $mail =  mail($to, $email_subject, $msg, $headers);
  if($mail)
	{
		echo 'success';
	}

else
	{
		echo 'failed';
	}
}

?>