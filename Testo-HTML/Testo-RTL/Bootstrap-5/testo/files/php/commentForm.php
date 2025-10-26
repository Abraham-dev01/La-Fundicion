<?
$name  = $_REQUEST["name"];
$email = $_REQUEST["email"];
$msg   = $_REQUEST["msg"];
$to    = "jthemesonline@gmail.com";
if (isset($email) && isset($name) && isset($msg)) {
    $email_subject = "This message was sent via Testo (Comment Form)";
		$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=iso-8859-1" . "\r\n";
$headers .= "From: ".$name." <".$email.">\r\n"."Reply-To: ".$email."\r\n" ;
$msg     = "From: $name<br/> Email: $email <br/> Message: $msg";
	
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