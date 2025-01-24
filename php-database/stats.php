<?php
// include "./db.php";
// try {
//     $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
//     $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
// } catch (PDOException $e) {
//     echo "Error: " . $e->getMessage();
//     echo json_encode('[{"name":"error","msg":"' . $e->getMessage() . '"}]');
// }

// $id = 99;
// $score = 9999;
// $death = "blue";

if ($death != "normal") {
    switch ($death) {
        case ("portal"):
            $stmt = $conn->prepare("SELECT count FROM portal_stat WHERE player_id='" . $id . "'");
            $stmt->execute();
            $count = $stmt->fetch(PDO::FETCH_ASSOC);
            break;
        case ("blue"):
            $stmt = $conn->prepare("SELECT count FROM blue_stat WHERE player_id='" . $id . "'");
            $stmt->execute();
            $count = $stmt->fetch(PDO::FETCH_ASSOC);
            break;
    }
    echo "<pre>";print_r($count);
    if (isset($count["count"])) {

        $count["count"] += 1;
        switch ($death) {
            case "portal":
                $stmt = $conn->prepare("UPDATE portal_stat SET `count` = :count WHERE `player_id` = :player_id");
                break;
            case "blue";
                $stmt = $conn->prepare("UPDATE blue_stat SET `count` = :count WHERE `player_id` = :player_id");
                break;
        }
        $stmt->bindParam(':player_id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':count', $count["count"], PDO::PARAM_INT);
        $stmt->execute();
    } else {
        switch ($death) {
            case "portal":
                $stmt = $conn->prepare("INSERT INTO portal_stat (`player_id`,`count`) VALUES (:player_id, 1)");
                break;
            case "blue":
                $stmt = $conn->prepare("INSERT INTO blue_stat (`player_id`, `count`) VALUES (:player_id, 1)");
                break;
        };
        $stmt->bindParam(':player_id', $id, PDO::PARAM_INT);
        $stmt->execute();
    }
}
