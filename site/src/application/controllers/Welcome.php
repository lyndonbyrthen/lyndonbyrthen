<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		$this->load->view('welcome_message2');
	}

	public function view($page = 'home')
	{
		switch (ENVIRONMENT) {
			case 'stage':
			$this->load->database('stage');
			break;
			case 'local':
			$this->load->database('local');
			break;
			case 'production':
			$this->load->database('default');
			break;
			default:
			$this->load->database('default');
		}

		global $application_folder;
		
		if (is_numeric($page)) {

			$instId = (int) $page;
			$page = 'installment';

		} else if ( ! file_exists($application_folder.'/views/pages/'.$page.'.php')) {	
		    //redirect('/');		
			show_404();
		}


		
		$this->load->library('user_agent');
		if ($this->agent->is_mobile()){
			$data['isMobile'] = true;
		} else {
			$data['isMobile'] = false;
		}

		

		$this->load->model('data_model');
/*
		$this->load->view('welcome_message');

		return;*/
		
		$this->load->helper('html_show_array');



		if ('installment' == $page) {
           $data['inst'] = $this->data_model->getInstallmentDetailById($instId);
           $data['pageTitle'] = $data['inst']['title'];
		}

		if ('home' == $page) {
			$data['insts'] = $this->data_model->getAllInstallmentDetail();
		}
		
		
		
		$data['pageName'] = $page;	
						
		//$data['title'] = ucfirst($page); // Capitalize the first letter
		$this->load->view('templates/header', $data);
		//$this->load->view('templates/mainmenu', $data);
		$this->load->view('pages/'.$page, $data);
		$this->load->view('templates/footer', $data);
		
	}
}
