<?php
$myfile = fopen("data.json", "r") or die("Unable to open file!");
$data = fread($myfile,filesize("data.json"));
$jsonobj = json_decode($data, true);
?>
<html>
<head>
	<style>
    	table, th, td {
          border: 1px solid black;
      	}
	</style>
</head>
<body>
<table>
  <tbody>
    <tr>
      <th>Name</th>
      <th>Lastname</th>
      <th>About</th>
      <th>hobbies</th>
    </tr>
    <?php foreach ($obj as $person) 
    {
        $hobbies = "";
        foreach($person->hobbies as $value)
        {
            $hobbies .= $value . ", ";
        }
        echo "
        <tr>
            <td>" . $person->firstname . "</td>
            <td>" . $person->lastname . "</td>
            <td>" . $person->about . "</td>
            <td>" . $hobbies . "</td>
        </tr>";
    }
    ?>
  </tbody>
</table>
</body>
</html>
<?php
fclose($myfile);