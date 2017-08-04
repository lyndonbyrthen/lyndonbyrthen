<?php

class Main_Controller extends CI_Controller {

	public function view()
	{
		$appid = $this->uri->segment(1);
		$data['appid'] = $appid;

		$this->load->view('templates/header', $data);
		$this->load->view('templates/body', $data);
		$this->load->view('templates/footer', $data);

	}

}

?>