<?php
require APPPATH.'/libraries/REST_Controller.php';

class API_Controller extends REST_Controller
{

  public function index_get()
  {
    
  }

  public function moviebuff_get()
  {
    // $data = json_decode(file_get_contents('/movierelease.json'));
    $filepath = 'assets/moviebuff/moviebuff_'.date("Y-m-d").'.json';
    if (file_exists($filepath)) {
    	$data = json_decode(file_get_contents($filepath));
    	// $this->response($filepath);
    	$this->response($data);
    } else {
    	$this->loadPage = 1;
        $this->res = array();
        $this->response($this->callMovieDB());
    }
    

  }

  public function index_post()
  {
    // Create a new book
  }

  private function callMovieDB() {
  	$curl = curl_init();

  	$today = date("Y-m-d");
  	$year = date("Y");

  	$query = http_build_query([
  		'page' => $this->loadPage,
  		'include_video' => 'true',
  		'include_adult' => 'false',
  		'sort_by' => 'primary_release_date.desc',
  		'api_key'=>'9ceb030330a7d13c7e200d7d7489a442',
  		'language'=>'en-US',
  		'primary_release_year'=>$year,
  		'primary_release_date.gte'=>$year.'-01-01',
  		'primary_release_date.lte'=>$today,
  		'year'=>$year,
  		'with_original_language'=>'en',
  		]);

  	$url = 'http://api.themoviedb.org/3/discover/movie?'.$query;
  	// var_dump($url);

  	curl_setopt_array($curl, array(
  		CURLOPT_URL => $url,
  		CURLOPT_RETURNTRANSFER => true,
  		CURLOPT_ENCODING => "",
  		CURLOPT_MAXREDIRS => 10,
  		CURLOPT_TIMEOUT => 30,
  		CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
  		CURLOPT_CUSTOMREQUEST => "GET",
  		CURLOPT_POSTFIELDS => "{}",
  		));

  	$response = curl_exec($curl);
  	$err = curl_error($curl);

  	curl_close($curl);

	  	if ($err) {
	  		//echo "cURL Error #:" . $err;
	  		return $err;
	  	} else {
	  		$this->res[] = json_decode($response);
	  		$this->loadPage++;
	  		
            if ($this->loadPage > 12) {
            	$filepath = 'assets/moviebuff/moviebuff_'.date("Y-m-d").'.json';
            	$fp = fopen($filepath, 'w');
				fwrite($fp, json_encode($this->res));
				fclose($fp);
            	return $this->res;
            } else {
            	return $this->callMovieDB();
            }
	  	}
 }

}

?>