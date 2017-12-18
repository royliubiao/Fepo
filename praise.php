<?php 
// 创建父类 
class Conmysql{
	public $servername;
	public $username;
	public $password;
	public $dbname;
	public $con = null;
//创建父类构造函数
	public function __construct($servername,$username,$password,$dbname){
		$this->servername = $servername;
		$this->username = $username;
		$this->password = $password;
		$this->dbname = $dbname;
	}
	//链接数据库
	public function getConnection(){
		try { 
			  $dsn = "mysql:host=$this->servername;dbname=$this->dbname";
    			$this->con = new PDO($dsn, $this -> username, $this -> password);
		}
		catch(PDOException $e)
		{
    			echo $e->getMessage();
		}
	}
	//更新数据库
	public function updateData($sql)
	{
		if($this->con == null){
			$this->getConnection();
		}
		header('content-type:application/json;charset=utf8');
		$res = $this-> con -> exec($sql);
		$arr  = array('result'=>$res);
		echo json_encode($arr);
		$this->closeCon();
	}
	//关闭数据库
	public function closeCon()
	{
		$this->con = null;
	}

}
//创建子类
class realConn extends Conmysql
{	//继承父类构造函数
	public function __construct($servername,$username,$password,$dbname){
		parent ::__construct($servername,$username,$password,$dbname);
	}
	//继承父类更新数据库方法
	public function updateRealData()
	{
		$sql = "UPDATE `text` SET num = num+1 WHERE id = 1";
		$this->updateData($sql);
	}
}
//实例化对象
$praiseConn = new realConn('localhost','root','','test');
$praiseConn->updateRealData();
 ?>

