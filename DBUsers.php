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
    function update_user($variable){

        if(check_params($variable, 'put', 'update')){
            $data = json_decode($_GET['data']);

            $id  = (int)$data->id;
            $name = htmlspecialchars($data->name, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $login = htmlspecialchars($data->login, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $email    = htmlspecialchars(filter_var($data->email, FILTER_VALIDATE_EMAIL), ENT_QUOTES| ENT_HTML401,'UTF-8');
            $group = htmlspecialchars($data->group, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $keyWord = htmlspecialchars($data->keyWord, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $password = htmlspecialchars($data->password, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $position = (int) $data->position;
            $access   = (int) $data->access;

            $sql = 'UPDATE  `users` SET 
                  `name`    = :name,
                  `login`   = :login,
                  `email`   = :email,
                  `group`   = :group,
                  `keyWord` = :keyWord,
                  `password` = :password,
                  `position` = :position,
                  `access`  = :access
                 WHERE `id` = :id';

            $arr = [
                ":name"     => $name,
                ":login"    => $login ,
                ":email"    => $email,
                ":group"    => $group ,
                ":keyWord"  => $keyWord ,
                ':password' => $password,
                ':id'       => $id,
                ":position"  => $position ,
                ":access"  => $access
            ];
print_r($arr);
            if(action_user($sql, $arr) == 1) {
                echo json_encode(['data' => 'success'])/*, 'Account was created'*/;
            }
        }

    }
    update_user($_GET);

    function delete_user_by_id($variable){
        if(check_params($variable, 'del', 'user')){
            $id = (int)$_GET['id'];
            $sql = 'DELETE FROM `users` WHERE `id` = :id';
            $arr = [":id" => $id];
            echo  action_user($sql, $arr);
        }
    }
    delete_user_by_id($_GET);

    function get_All_users($variable){
        if(check_params($variable, 'get', 'allUsers')){
            $sql = 'SELECT * FROM `users`';
            $arr = [];
            echo json_encode(['data' => get_all($sql, $arr)]);
        }
    }
    get_All_users($_GET);

    function in_login($variable){
        if(check_params($variable, 'autho', 'autho')){
            $data = json_decode($_GET['data']);

            $login    = htmlspecialchars($data->login, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $password = htmlspecialchars($data->password, ENT_QUOTES| ENT_HTML401,'UTF-8');

            $sql = 'SELECT id, login, name, email, access, position FROM `users` WHERE
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
                ":keyWord"  => $keyWord ,

            ];
            if(action_user($sql, $arr) == 1) {
                echo json_encode(['data' => 'success'])/*, 'Account was created'*/;
            }

        }
    }
    create_user($_GET);

function action_user($val, $arr){
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
       // exit($e->getMessage());
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

function get_all($val, $arr){
    global $settings;

    try {

        $DBH = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbName'], $settings['user'], $settings['password']);
        $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql =  $val;
        $res = $DBH -> prepare($sql);
        $res -> execute($arr);
        $res -> setFetchMode(PDO::FETCH_ASSOC);
        $result = $res -> fetchAll();

        $send = [];
        foreach ($result as $key => $value){
            $send[] = $value;
        }
        return $send;

    }catch(PDOException $e){
        exit($e->getMessage());
    }

}


if(isset($_GET)){
   // echo print_r($_GET);
}


?>