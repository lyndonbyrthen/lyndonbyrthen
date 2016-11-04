<?php

class Section extends CI_Controller {

	public function view()
	{

		$segs = $this->uri->segment_array();

		$filePath = 'sections/';

		for ($i=3; $i<count($segs); $i++) {			
			$filePath = $filePath.$segs[$i].'/';
		}
		
		$filePath .= $segs[count($segs)];
		
		if (file_exists(APPPATH.'views/'.$filePath.'.php')){
			$this->load->view($filePath);
		} else if (file_exists(APPPATH.'views/'.$filePath.'/index.php')) {
			$this->load->view($filePath.'/index');
		}else {
			show_404();
		}
	}
	
}

?>