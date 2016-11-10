<?php

$html = file_get_contents("app.html");
$html = preg_replace('~>\s+<~', '><', $html);

print($html);
