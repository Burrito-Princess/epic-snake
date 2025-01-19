<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboards</title>
    <link rel="stylesheet" href="./assets/leader.css">
    <?php
    include "./tables.php";
    $boards = [
        "overall" => [
            "overall"
        ],
        "edition" => [
            "key",
            "touch"
        ],
        "cc" => [
            "80",
            "100",
            "120"
        ],
    ];
    ?>
</head>

<body>
    <a href="./index.php">Back</a>
    <div class="head-container">
      <div class="leader power-up">
        <h2>Power Ups</h2>
        <table>
            <tr>
                <td>Mode</td>
                <td>Action</td>
                <td>lenght</td>
            </tr>
            <tr>
                <td>Rainbow</td>
                <td>2 points per Apple</td>
                <td>100 tics</td>
            </tr>
            <tr>
                <td>Grey</td>
                <td>You can't die</td>
                <td>Until next Apple</td>
            </tr>
            <tr>
                <td>Blue</td>
                <td>Can't go Trough walls</td>
                <td>Until next Apple</td>
            </tr>
            <tr>
                <td>Grey + White</td>
                <td>2% more speed</td>
                <td>100 tics</td>
            </tr>
            <tr>
                <td>5 Apples</td>
                <td>1 of 5 apples is real</td>
                <td>Util next Apple</td>
            </tr>
            <tr>
                <td>Blue - Orange Apple</td>
                <td>Teleport to the other Apple</td>
                <td>Until next Apple</td>
            </tr>
        </table>
    </div>  
    </div>
    
    <div class="container"> 
    <?php
    foreach ($boards as $table => $types) {
        foreach ($types as $type) {

            echo "<div class='leader'>";
            echo "<h2>" . $type . "</h2>";

    ?>
            <table>
                <tr>
                    <td>User</td>
                    <td>Score</td>
                    <td>CC</td>
                </tr>
                <?php
                foreach (tables($table, $type) as $entry) {
                ?>
                    <tr>
                        <td>
                            <?= $entry["name"] ?>
                        </td>
                        <td>
                            <?= $entry["score"] ?>
                        </td>
                        <td>
                            <?= $entry["cc"] ?>
                        </td>
                    </tr>
                <?php
                }
                ?>

            </table>
            <br>
    <?php
            echo "</div>";
        };
    };

    ?>
    </div>
</body>

</html>