<?php
 function tables ($table, $type){
        include "./php-database/db.php";
        try {
            $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            switch ($table){
                case ("overall"):
                    $stmt = $conn->prepare("SELECT * FROM `personal_high` ORDER BY score DESC LIMIT 6");
                    break;
                case ("edition"):
                    $stmt = $conn->prepare("SELECT * FROM `scores` INNER JOIN players ON scores.player_id = players.id WHERE `edition` = :edition ORDER BY score DESC LIMIT 6");
                    $stmt->bindParam(':edition', $type, PDO::PARAM_STR);
                    break;
                case ("cc"):
                    $stmt = $conn->prepare("SELECT * FROM `scores` INNER JOIN players ON scores.player_id = players.id WHERE `cc` = :cc ORDER BY score DESC LIMIT 6");
                    $stmt->bindParam(':cc', $type, PDO::PARAM_STR);
                    break;
            }
    
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            echo json_encode(['error' => 'cannot fetch from database']);
        }
        $conn = null;
        
    }
?>