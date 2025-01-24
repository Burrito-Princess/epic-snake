<?php
include 'db.php';
header('Access-Control-Allow-Origin: *');
header("Content-Type: application/json; charset=UTF-8");

$content = trim(file_get_contents("php://input"));
$decoded = json_decode($content, true);

if (!empty($decoded['name']) && !empty($decoded['score'])) {

    $name = $decoded['name'];
    $score = $decoded['score'];
    $edition = $decoded['edition'];
    $cc = $decoded['cc'];
    $death = $decoded['death'];

    // $name = "dip";
    // $score = 666;
    // $edition = "test";
    // $cc = 9999;
    // $death = "portal";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // QUERIES
        $stmt = $conn->prepare("INSERT IGNORE INTO players (`name`) VALUES ('" . $name . "')");
        $stmt->execute();

        $stmt = $conn->prepare("SELECT id FROM players WHERE name='" . $name . "'");
        $stmt->execute();

        $id = $stmt->fetch(PDO::FETCH_ASSOC)['id'];

        $stmt = $conn->prepare("INSERT INTO scores (`player_id`, `score`, `edition`, `cc`) VALUES (:player_id, :score, :edition, :cc)");
        $stmt->bindParam(':player_id', $id, PDO::PARAM_INT);
        $stmt->bindParam(':score', $score, PDO::PARAM_INT);
        $stmt->bindParam(':edition', $edition, PDO::PARAM_STR);
        $stmt->bindParam(':cc', $cc, PDO::PARAM_INT);
        $stmt->execute();
        include "./player_highscore.php";
        include "./stats.php";
        
    } catch (PDOException $e) {
        echo json_encode(['error' => 'cannot add to database']);
    }
    $conn = null;
} else {
    echo json_encode(['error' => 'invalid JSON']);
}
