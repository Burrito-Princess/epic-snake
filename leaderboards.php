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
</body>

</html>