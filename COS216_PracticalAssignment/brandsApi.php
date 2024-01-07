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
        if($request->type == "GetRandomBrands")
        {
            $api_query = "SELECT * FROM brands ORDER BY RAND() LIMIT 5";
            $api_result = mysqli_query($conn, $api_query);
            $api_response = array();
            while($api_row = mysqli_fetch_assoc($api_result))
            {
                $api_brand = $api_row['name'];
                $api_image = $api_row['image'];
                $api_response[] = array
                (
                    'brand' => $api_brand,
                    'image' => $api_image
                );
            }
            echo json_encode($api_response);
        }
        else if($request->type == "SetBrand")
        {
            $api_brand = $request->brand;
            $api_image = $request->image;
            $api_query = "SELECT * FROM brands WHERE name = ?";
            $api_query = mysqli_prepare($conn, $api_query);
            mysqli_stmt_bind_param($api_query, "s", $api_brand);
            mysqli_stmt_execute($api_query);
            if(!mysqli_stmt_get_result($api_query))
            {
                $api_query = "UPDATE brands SET image = ? WHERE name = ?";
                $api_query = mysqli_prepare($conn, $api_query);
                mysqli_stmt_bind_param($api_query, "ss", $api_image, $api_brand);
                echo "Updated";
            }
            else
            {
                $api_query = "INSERT INTO brands (name, image) VALUES (?, ?)";
                $api_query = mysqli_prepare($conn, $api_query);
                mysqli_stmt_bind_param($api_query, "ss", $api_brand, $api_image);
                echo "Inserted";
            }
            try
            {
                mysqli_stmt_execute($api_query);
            }
            catch(Exception $e)
            {
                echo $e->getMessage();
            }
        }
    }
}
$api = api::getInstance();
$api->handleRequest();