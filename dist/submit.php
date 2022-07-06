<?php

  $post = file_get_contents('php://input');
  $answer = "Family";

  if ($post == $answer) {
      echo "correct";
  } else {
      echo "wrong";
  }

  /*
  $conn = new mysqli("localhost", "picardle_user", "muUnXUDg29z2cu", "picardle");
  
  if ($conn->connect_error) {
    die("ERROR: Unable to connect: " . $conn->connect_error);
  } 

  $result = $conn->query("SELECT * FROM `episodes` where name = '$fake_post'");

  while ($row = $result->fetch_assoc()) {
    //echo 'Episode: '.$row['name'].'<br>';

} */

?>