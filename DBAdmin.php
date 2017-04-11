<?php


$settings = [
    'host'     => 'mysql.zzz.com.ua',
       'dbName'   => 'andrey666',
       'user'     => 'andrey666',
       'password' => 'uioder65'];

function check_params($variable, $params, $value){
 if(isset($variable) && $variable[$params] == $value) return true;
 return false;
}

    function create_task($variable){
        if(check_params($variable,'post', 'post')){
            $data = json_decode($_GET['data']);

            $uid  = (int)$data->uid;
            $title = htmlspecialchars($data->title, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $status = (int)$data->status;
            $priority = htmlspecialchars($data->priority, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $shotDescpt = htmlspecialchars($data->shotDescpt, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $versionOs = htmlspecialchars($data->versionOs, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $versionBrouser = htmlspecialchars($data->versionBrouser, ENT_QUOTES|ENT_HTML401,'UTF-8');
            $url = htmlspecialchars($data->url, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $description = htmlspecialchars($data->description, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $file = htmlspecialchars($data->file, ENT_QUOTES| ENT_HTML401,'UTF-8');
            $id = (int)$data->id;
            echo $status, $shotDescpt, $description, $versionBrouser;
            $sql = 'INSERT INTO `tasks` SET 
                  `uid` = :uid,
                  `title` = :title,
                  `status` = :status,
                  `priority` = :priority,
                  `shotDescpt` =:shotDescpt,
                  `versionOs` = :versionOs,
                  `versionBrouser` = :versionBrouser,
                  `url` = :url,
                  `description` = :description,
                  `file` = :file ';
            $arr = [
                ":uid" => $uid,
                ":title" => $title ,
                ":status" => $status,
                ":priority" => $priority ,
                ":shotDescpt" => $shotDescpt ,
                ":versionOs" => $versionOs ,
                ":versionBrouser" =>$versionBrouser,
                ":url" => $url,
                ":description" => $description,
                ":file" => $file,
            ];
            echo get_all1( $sql, $arr);

        }
    }
    create_task($_GET);

function delete_task_by_id($variable){
    if(check_params($variable, 'delete', 'del')){
        $id = (int)$_GET['id'];
        $sql = 'DELETE FROM `tasks` WHERE `id` = :id';
        $arr = [":id" => $id];
        echo  get_all1($sql, $arr);
    }
}
delete_task_by_id($_GET);
function update_task($variable){

    if(check_params($variable, 'put', 'update')){
       $data = json_decode($_GET['data']);

        $uid  = (int)$data->uid;
        $title = htmlspecialchars($data->title, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $status = (int)$data->status;
        $priority = htmlspecialchars($data->priority, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $shotDescpt = htmlspecialchars($data->shotDescpt, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $versionOs = htmlspecialchars($data->versionOs, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $versionBrouser = htmlspecialchars($data->versionBrouser, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $url = htmlspecialchars($data->url, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $description = htmlspecialchars($data->description, ENT_QUOTES | ENT_HTML401,'UTF-8');
        $file = htmlspecialchars($data->file, ENT_QUOTES| ENT_HTML401,'UTF-8');
        $id = (int)$data->id;

        $sql = 'UPDATE  `tasks` SET 
                `uid` = :uid,
                  `title` = :title,
                  `status` = :status,
                  `priority` = :priority,
                  `shotDescpt` =:shotDescpt,
                  `versionOs` = :versionOs,
                  `versionBrouser` = :versionBrouser,
                  `url` = :url,
                  `description` = :description,
                  `file` = :file
                  WHERE  `id`= :id';
        $arr = [
            ":uid" => $uid,
            ":title" => $title ,
            ":status" => $status,
            ":priority" => $priority ,
            ":shotDescpt" => $shotDescpt ,
            ":versionOs" => $versionOs ,
            ":versionBrouser" =>$versionBrouser,
            ":url" => $url,
            ":description" => $description,
            ":file" => $file,
            ':id' => $id
        ];
        echo  get_all1($sql, $arr);
    }
}
update_task($_GET);
function response_tasks($variable){
    if(check_params($variable, 'get', 'tasks')){
        $tasks = get_all('select * from `tasks`', []);
        echo json_encode($tasks);
    }
}
response_tasks($_GET);
function response_module($variable){
    if(check_params($variable, 'get', 'modulesAdmin')){
        $modules = get_all('select * from `admin_modules`', []);
        echo json_encode($modules);
    }
}
response_module($_GET);


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
function get_all1($val, $arr){
    global $settings;

    try {

        $DBH = new PDO("mysql:host=" . $settings['host'] . ";dbname=" . $settings['dbName'], $settings['user'], $settings['password']);
        $DBH->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql =  $val;
        $res = $DBH -> prepare($sql);
        $res -> execute($arr);
        return $res->rowCount();

    }catch(PDOException $e){
        exit($e->getMessage());
    }

}
if( $_GET['delete']){
    echo json_encode($_GET);
    echo json_encode( $_POST);

}






function change_status($variable){

    if(check_params($variable, 'status', 'change')){
        $data = json_decode($_GET['data']);

        $status = (int)$data->status;

        $id = (int)$data->id;

        $sql = 'UPDATE  `tasks` SET 
                  `status` = :status
                  WHERE  `id`= :id';
        $arr = [
            ":status" => $status,
            ':id' => $id
        ];
     echo  get_all1($sql, $arr);
    }
}
change_status($_GET);