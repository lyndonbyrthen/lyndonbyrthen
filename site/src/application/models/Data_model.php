<?php

class Data_model extends CI_Model {

        //=========================================
        //FUNCTIONS
        //=========================================
        
        public function getAllInstallmentDetail() {
           $deltas = $this->getAllInstallmentIndex();
           $insts = array();
           foreach ($deltas as $d) {    
                 //$insts[$d['inst_delta']] = $this->getInstallmentDetailById($d['inst_delta']);
                 $insts[] = $this->getInstallmentDetailById($d['inst_delta']);
           }       
           return $insts;       
        }
        
        public function getInstallmentDetailById($instId) {
                
                $temp = $this->getInstallmentById($instId);
                $inst = array_shift($temp);
                
                $songIds = explode('+',$inst['song_list']);
                $songs = array();
                $personIds = array();
                $persons = array();

                foreach ($songIds as $sId) {
                        $temp = $this->getSongById($sId);
                        $songObj = array_shift($temp);
                        
                        $personIds = array_merge($personIds, explode('+',$songObj['singer_list']));
                        //$personIds = array_merge($personIds, explode('+',$songObj['composer_list']));
                        //$personIds = array_merge($personIds, explode('+',$songObj['lyricist_list']));
                        
                        $songs[] = $songObj;
                }
                
                $personIds = array_unique($personIds);
                
                //print_r($personIds);
                
                foreach ($personIds as $pId) {
                        $temp = $this->getPersonById($pId);
                        $personObj = array_shift($temp);
                        if (!empty($personObj['auto_key'])) {
                          $persons[$personObj['auto_key']] = $personObj;        
                        }       
                        
                }

                $inst['persons'] = $persons;
                $inst['songs'] = $songs;

                //$this->load->helper('html_show_array');
                //html_show_array($inst);
                //html_show_array($persons);
                
                
                return $inst;
                
        }
        
        public function getAllInstallmentIndex() {
        
                $query = $this->db->query('
                                SELECT inst_delta
                                FROM installments
                                WHERE published=1
                                ');
        
                return $query->result_array();
        
        }
        
        public function getAllInstallments() {
                
                $query = $this->db->query('
                                SELECT *                
                                FROM installments
                                WHERE published=1               
                                ');
                
                return $query->result_array();
                
        }
        
        public function getInstallmentById($instId) {
                $query = $this->db->query('
                                SELECT *
                                FROM installments
                                WHERE inst_delta=?
                                ', array($instId));
                
                return $query->result_array();
        }
        
        public function getSongById($songId) {
        
                $query = $this->db->query('
                                SELECT *
                                FROM songs
                                WHERE auto_key=?
                                ', array($songId));
        
                return $query->result_array();
        
        }
        
        public function getPersonById($personId) {
        
                $query = $this->db->query('
                                SELECT *
                                FROM persons
                                WHERE auto_key=?
                                ', array($personId));
        
                return $query->result_array();  
        }

}