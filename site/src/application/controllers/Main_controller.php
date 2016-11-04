<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main_Controller extends CI_Controller {
	
	public function view()
	{
        
		require APPPATH.'/views/sections/sitemap.php';
		$this->load->helper('text');
 		$this->load->helper('url');
 		$this->load->helper('form');

		$groupname = $this->uri->segment(1);
		$secname = $this->uri->segment(2);
		
		if (!$groupname && !$secname) {
			$groupname = $groups[0]['id'];
			$secname = $groups[0]['sections'][0]['id'];
		}
        

		$sec_found = false;
		$index_found = false;

		foreach ($groups as $group) {
			if ($group['id'] == $groupname) {
				foreach ($group['sections'] as $sec) {
					if ($sec['id'] == $secname) $sec_found = true;
				}
			}
		}



		if (file_exists(APPPATH.'/views/sections/'.$this->uri->uri_string().'/index.php')){
			$index_found = true;
		}
	
		if (!($sec_found || $index_found)){
			// Whoops, we don't have a page for that!
			show_404();
		}



		$this->load->library('user_agent');
		if ($this->agent->is_mobile()){
			$data['isMobile'] = true;
		} else {
			$data['isMobile'] = false;
		}
		
		/* $data['sitemap']['groups'] = $groups;
		$data['sitemap']['startGroupName'] = $groupname;
		$data['sitemap']['startSecName'] = $secname; */
		
		$data['startGroupName'] = $groupname;
		$data['startSecName'] = $secname;

		$data['title'] = '';

		$this->load->view('templates/header', $data);
		$this->load->view('templates/body', $data);
		$this->load->view('templates/footer', $data);

	}

}
/* End of file main_controller.php */
/* Location: ./application/controllers/main_controller.php */