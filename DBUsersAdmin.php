<?php
    $settings = [
        'host'     => 'localhost',
        'dbName'   => 'backtrack',
        'user'     => 'root',
        'password' => ''];

    function check_params($variable, $params, $value){
        if(isset($variable) && $variable[$params] == $value) return true;
        return false;
    }

    function in_login($variable){
        if(check_params($variable, 'autho', 'autho')){
            $data = json_decode($_GET['data']);

            $login    = htmlspecialchars($data->login, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $password = htmlspecialchars($data->password, ENT_QUOTES| ENT_HTML401,'UTF-8');

            $sql = 'SELECT id, login, name, email FROM `users` WHERE  
                    `login`    = :login AND
                    `password` = :password';
            $arr = [
                ':login'    => $login,
                ':password' => $password];

            echo json_encode(['data' => get_user($sql, $arr)]);
        }
    }

    in_login($_GET);

    function create_user($variable){

        if(check_params($variable, 'registr', 'reg')){
            $data = json_decode($_GET['data']);


            $name     = htmlspecialchars($data->name, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $login    = htmlspecialchars($data->login, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $email    = htmlspecialchars(filter_var($data->email, FILTER_VALIDATE_EMAIL), ENT_QUOTES| ENT_HTML401,'UTF-8');
            $password = htmlspecialchars($data->password, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $group    = htmlspecialchars($data->group| ENT_QUOTES, ENT_HTML401,'UTF-8');
            $keyWord  = htmlspecialchars($data->keyWord, ENT_QUOTES| ENT_HTML401,'UTF-8');



            $sql = 'INSERT INTO `users` SET 
                    `name`       = :name,
                      `login`    = :login,
                      `email`    = :email,
                      `password` = :password,
                      `group`    = :group,
                      `keyWord`  = :keyWord ';
            $arr = [
                ":name"     => $name,
                ":login"    => $login ,
                ":email"    => $email,
                ":password" => $password ,
                ":group"    => $group ,
                ":keyWord"  => $keyWord


            ];
            if(post_user($sql, $arr) == 1) {
                echo json_encode(['data' => 'success'])/*, 'Account was created'*/;
            }

        }
    }
    create_user($_GET);

function post_user($val, $arr){
    global $settings;

    try {

        $DBH = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbName'], $settings['user'], $settings['password']);
        $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql =  $val;
        $res = $DBH -> prepare($sql);
        $res -> execute($arr);
        return $res->rowCount();

    }catch(PDOException $e){
        exit("A user with such data exists!");
        //exit($e->getMessage());
    }

}

function get_user($val, $arr){
    global $settings;

    try {

        $DBH = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbName'], $settings['user'], $settings['password']);
        $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql =  $val;
        $res = $DBH -> prepare($sql);
        $res -> execute($arr);
        $res -> setFetchMode(PDO::FETCH_ASSOC);
        $result = $res -> fetch();

        $send = [];
        if($result){
            foreach ($result as $key => $value){
                $send[$key] = $value;
            }
            return $send;
        }

        return 'error';

    }catch(PDOException $e){
        exit($e->getMessage());
    }

}
if(isset($_GET)){
   // echo print_r($_GET);
}


?>