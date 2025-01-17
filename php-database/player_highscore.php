<?php
include "./db.php";
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    echo json_encode('[{"name":"error","msg":"' . $e->getMessage() . '"}]');
}
$stmt = $conn->prepare("SELECT * FROM players");
$stmt->execute();
$players = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($players as $player) {
    $player_id = $player['id'];
    $stmt = $conn->prepare("SELECT * FROM scores WHERE player_id = '$player_id' ORDER BY score DESC LIMIT 1");
    $stmt->execute();
    $highscore = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if (!empty($highscore)){
        $player_highscore[$player["name"]] = $highscore;
    }
    
}
$stmt = $conn->prepare("DELETE FROM `personal_high`");
$stmt->execute();
for ($i = 0; $i < count($player_highscore); $i++) {
    $keys = array_keys($player_highscore);
    echo $keys[$i] . " " . $player_highscore[$keys[$i]][0]["score"] . "<br>";

    $entry = $player_highscore[$keys[$i]][0];
    $player_id = $entry["player_id"];
    $name = $keys[$i];
    $score = intval($entry["score"]);
    $cc = intval($entry["cc"]);

    $stmt = $conn->prepare("INSERT INTO `personal_high` (`player_id`, `name`, `score`, `cc`) VALUES (:player_id, :name, :score, :cc)");
    $stmt->bindParam(':player_id', $player_id, PDO::PARAM_INT);
    $stmt->bindParam(':name', $name, PDO::PARAM_STR);           
    $stmt->bindParam(':score', $score, PDO::PARAM_INT);
    $stmt->bindParam(':cc', $cc, PDO::PARAM_INT);
    $stmt->execute();
}
echo "<pre>";
print_r($player_highscore);

?>