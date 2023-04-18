<?php
    //get the code from the frontend
    $code = $_POST['code'];

    //create a file with the code
    $myfile = fopen("code.php", "w") or die("Unable to open file!");
    fwrite($myfile, "<?php");
    fwrite($myfile, $code);
    fwrite($myfile, "?>");
    fclose($myfile);

    system("C:\wamp\bin\php\php8.1.13\php.exe -f code.php 2>&1", $output);
    //execute code
    $output = shell_exec('php code.php');
    return $output;
    //return output
    echo $output;
?>