<?php
//Timothy_Whitaker_u22744968
class api 
{
    private static $instance = null;
    private function __construct() {}
    public static function getInstance() 
    {
        if (self::$instance === null)
        {
            self::$instance = new api();
        }
        return self::$instance;
    }
    function handleRequest()
    {
        require_once 'COS216/PA4/php/config.php';

        $postData = file_get_contents('php://input');
        $request = json_decode($postData);
        if($request->apikey == '')
        {
            $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error. API Key is missing");
            echo json_encode($output);
            return;
        }
        $api_key = $request->apikey;
        $api_query = "SELECT * FROM users WHERE API_Key = ?";
        $stmt = mysqli_prepare($conn, $api_query);
        api::checkStmt($stmt, $conn);
        mysqli_stmt_bind_param($stmt, "s", $api_key);
        api::checkExecute($stmt, $conn);

        $result = mysqli_stmt_get_result($stmt);
        $row = mysqli_fetch_assoc($result);
        if($request->type == 'GetAllCars' && ($row != null || $api_key = 'a9198b68355f78830054c31a39916b7f') && $request->return != '')
        {
            $query = "SELECT ";
            if (implode(", ", $request->return) != '')
            {
                $query .= implode(", ", $request->return);
                $query = str_replace(", image", "", $query);
            }
            else
            {
                $query .= "*";
            }
            $query .= " FROM cars";

            $params = array();
            if($request->search != '')
            {
                $query .= " WHERE ";
                $i = 0;
                foreach($request->search as $key => $value)
                {
                    if($i > 0)
                    {
                        $query .= " AND ";
                    }
                    if($request->fuzzy)
                    {
                        $value = "%" . $value . "%";
                    }
                    $fuzzy = $request->fuzzy ? "LIKE" : "=";
                    $query .= $key . " " . $fuzzy . " ?";
                    $params[] = $value ;
                    $i++;
                }
            }
            if($request->sort != '')
            {
                $query .= " ORDER BY " . $request->sort . " ";
            }
            if($request->order != '')
            {
                $query .= $request->order;
            }
            if($request->limit != '')
            {
                $query .= " LIMIT " . $request->limit;
            }
            $stmt = mysqli_prepare($conn, $query);
            api::checkStmt($stmt, $conn);
            if(!empty($params)){
                $types = str_repeat("s", count($params));
                mysqli_stmt_bind_param($stmt, $types, ...$params);
            }
            api::checkExecute($stmt, $conn);
    
            $result = mysqli_stmt_get_result($stmt);
            if(!$result)
            {
                $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Bad Request ".mysqli_error($conn));
                echo json_encode($output);
                return;
            }
            $mustGetImage = in_array("image", $request->return);
            $url = 'https://wheatley.cs.up.ac.za/api/getimage';
            if(mysqli_num_rows($result) > 0)
            {
                $output = array();
                while($row = mysqli_fetch_assoc($result))
                {
                    if($mustGetImage)
                    {
                        $url .= '?brand=' . urlencode($row['make']);
                        $url .= '&model=' . urlencode($row['model']);
                        $ch = curl_init();
                        curl_setopt($ch, CURLOPT_URL, $url);
                        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                        $urlResponse = curl_exec($ch);
                        curl_close($ch);
                        $row['image'] = $urlResponse;
                        $url = 'https://wheatley.cs.up.ac.za/api/getimage';
                    }
                    array_push($output, $row);
                }
                $outputArray = array("status" => "success", "timestamp" => strval(time()), "data" => $output);
                echo json_encode($outputArray);
            }
            else
            {
                $output = array("status" => "success", "timestamp" => strval(time()), "data" => array());
                echo json_encode($output);
            }

            mysqli_stmt_close($stmt);
            mysqli_close($conn);
        }
        else if($request->type == 'update' && $request->reason != '' && $row != null)
        {
            if($request->reason == 'set')
            {
                $query = "UPDATE users SET Preferences = ? WHERE API_Key = ?";
                $stmt = mysqli_prepare($conn, $query);
                api::checkStmt($stmt, $conn);
                mysqli_stmt_bind_param($stmt, "ss", json_encode($request->preferences), $api_key);
                api::checkExecute($stmt, $conn);
        
                $output = array("status" => "success", "timestamp" => strval(time()), "data" => "Preferences updated");
                echo json_encode($output);
                mysqli_stmt_close($stmt);
                mysqli_close($conn);
            }
            else if($request->reason == 'get')
            {
                $query = "SELECT Preferences FROM users WHERE API_Key = ?";
                $stmt = mysqli_prepare($conn, $query);
                api::checkStmt($stmt, $conn);
                mysqli_stmt_bind_param($stmt, "s", $api_key);
                api::checkExecute($stmt, $conn);
        
                $result = mysqli_stmt_get_result($stmt);
                if(!$result)
                {
                    $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Bad Request ".mysqli_error($conn));
                    echo json_encode($output);
                    return;
                }
                $row = mysqli_fetch_assoc($result);
                $output = array("status" => "success", "timestamp" => strval(time()), "data" => json_decode($row['Preferences']));
                echo json_encode($output);
                mysqli_stmt_close($stmt);
                mysqli_close($conn);
            }
            else
            {
                $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error. Invalid reason");
                echo json_encode($output);
                return;
            }
        }
        else if($request->type == 'rate')
        {
            if($request->avg == true && $request->reason == 'get')
            {
                $query = "SELECT ROUND(AVG(rating),2) AS rating FROM ratings WHERE id_trim = ? GROUP BY id_trim";
                $stmt = mysqli_prepare($conn, $query);
                api::checkStmt($stmt, $conn);
                mysqli_stmt_bind_param($stmt, "i", $request->id_trim);
                api::checkExecute($stmt, $conn);
            }
            else
            {
                $query = "SELECT * FROM ratings WHERE API_Key = ? AND id_trim = ?";
                $stmt = mysqli_prepare($conn, $query);
                api::checkStmt($stmt, $conn);
                mysqli_stmt_bind_param($stmt, "si", $api_key, $request->id_trim);
                api::checkExecute($stmt, $conn);
            }
            $result = mysqli_stmt_get_result($stmt);
            if(!$result)
            {
                $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Bad Request ".mysqli_error($conn));
                echo json_encode($output);
                return;
            }
            $row = mysqli_fetch_assoc($result);
            if($request->reason == 'get')
            {
                if($row == null)
                {
                    $output = array("status" => "success", "timestamp" => strval(time()), "data" => "0");
                    echo json_encode($output);
                    return;
                }
                else
                {
                    $output = array("status" => "success", "timestamp" => strval(time()), "data" => $row['rating']);
                    echo json_encode($output);
                    return;
                }
            }
            else if($request->reason == 'set')
            {
                if($row == null)
                {
                    $query = "INSERT INTO ratings (API_Key, id_trim, rating) VALUES (?, ?, ?)";
                    $stmt = mysqli_prepare($conn, $query);
                    api::checkStmt($stmt, $conn);
                    mysqli_stmt_bind_param($stmt, "sid", $api_key, $request->id_trim, $request->rating);
                    api::checkExecute($stmt, $conn);
                    $output = array("status" => "success", "timestamp" => strval(time()), "data" => "rating added");
                    echo json_encode($output);
                    mysqli_stmt_close($stmt);
                    mysqli_close($conn);
                }
                else if($row['rating'] != $request->rating)
                {
                    $query = "UPDATE ratings SET rating = ? WHERE API_Key = ? AND id_trim = ?";
                    $stmt = mysqli_prepare($conn, $query);
                    api::checkStmt($stmt, $conn);
                    mysqli_stmt_bind_param($stmt, "dsi", $request->rating, $api_key, $request->id_trim);
                    api::checkExecute($stmt, $conn);
                    $output = array("status" => "success", "timestamp" => strval(time()), "data" => "rating updated");
                    echo json_encode($output);
                    mysqli_stmt_close($stmt);
                    mysqli_close($conn);
                }
                else
                {
                    $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error. rating already exists");
                    echo json_encode($output);
                    return;
                }
            }
            else
            {
                $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error. Invalid reason");
                echo json_encode($output);
                return;
            }
        }
        else
        {
            $out = '{
                "status": "error",
                "timestamp": "' . strval(time()) . '",
                "data": "Error. Post parameters are missing"
            }';
            echo $out;
            exit();
        }
    }
    function checkStmt($stmt, $conn)
    {
        if(!$stmt)
        {
            $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error preparing query: ".mysqli_error($conn));
            echo json_encode($output);
            die();
            return;
        }
    }
    function checkExecute($stmt, $conn)
    {
        if(!mysqli_stmt_execute($stmt))
        {
            $output = array("status" => "error", "timestamp" => strval(time()), "data" => "Error executing query: ".mysqli_error($conn));
            echo json_encode($output);
            die();
            return;
        }
    }
}
$api = api::getInstance();
$api->handleRequest();