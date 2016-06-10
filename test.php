<?php
            function testforcoord($a, $b)  {
                return $a >= 0 && $a < 10 && $b >= 0 && $b < 10;
            }
            session_start();
            if ($_GET['reset'] == 'true') {
                    for ($i = 0; $i < 10; $i++) {
                    for ($j = 0; $j < 10; $j ++) {
                        $board[$i][$j] = false;
                        $help[$i][$j] = 0;
                        $guess[$i][$j] = "$";
                    }
                }
                $count = 0;
                while ($count != 10) {
                     $i = rand(0, 9);
                     $j = rand(0, 9);
                     if ($board[$i][$j] == false) {
                        $board[$i][$j] = true;
                        $count ++;   
                         
                         if (testforcoord($i + 1, $j)) {
                            $help[$i + 1][ $j] ++;
                         }
                         if (testforcoord($i + 1, $j + 1)) {
                            $help[$i + 1][$j + 1] ++;
                         }
                         if (testforcoord($i + 1, $j - 1)) {
                            $help[$i + 1][$j - 1] ++;
                         }
                         if (testforcoord($i, $j + 1)) {
                            $help[$i][ $j + 1] ++;
                         }
                         if (testforcoord($i, $j - 1)) {
                            $help[$i][$j - 1] ++;
                         }
                         if (testforcoord($i - 1, $j)) {
                            $help[$i - 1][ $j] ++;
                         }
                         if (testforcoord($i - 1, $j + 1)) {
                            $help[$i - 1][ $j + 1] ++;
                         }
                         if (testforcoord($i - 1, $j - 1)) {
                            $help[$i - 1][ $j - 1] ++;
                         }
                     }
              
                }
                
                $_SESSION['board'] = $board;
                $_SESSION['help'] = $help;
                $_SESSION['guess'] = $guess;
            }
            
            if (isset($_GET['x'])) {
                if ($_SESSION['board'][$_GET['x']][$_GET['y']]) {
                    $_SESSION['guess'][$_GET['x']][$_GET['y']] = "Boum";
                } else {
                    $_SESSION['guess'][$_GET['x']][$_GET['y']] = $_SESSION['help'][$_GET['x']][$_GET['y']];
                }
            }
            
            ?>
 <!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Page de Test</title>
		<link rel="stylesheet" href="feuille.css" />
	</head>

	<body>
		<div id="content">
   <?php       
            $nmb = -10;
            $perdu = false;
            echo "<table>";
            for ($i = 0; $i < 10; $i++) {
                echo "<tr>";
                for ($j = 0; $j < 10; $j ++) {
                    if ($_SESSION['guess'][$i][$j] === '$') {
                        $nmb ++;
                    }
                    if ($_SESSION['guess'][$i][$j] === 'Boum') {
                        $perdu = true;
                    }
                    echo "<td>";
                    echo "<a href=\"test.php?x=".$i."&y=".$j."\">".$_SESSION['guess'][$i][$j]."</a>";
                    echo"</td>";
                }
                echo "</tr>";
            }
            
            echo "</table>";
            echo $perdu ? "PERDU</br>" : $nmb == 0 ? "GAGNÉ</br>" : $nmb;
            
     ?>
		</div>	
        <a href="test.php">Rien</a>
        <a href="test.php?reset=true">Reset</a>
	</body>
</html>
