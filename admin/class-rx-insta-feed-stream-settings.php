<?php



class Rx_Insta_Feed_Settings {

    protected $settings = array();
    public function __call($methodName, $params = null)
    {
        if($methodName == 'set' && count($params) == 2)
        {
            $key = $params[0];
            $value = $params[1];
            $this->settings[$key] = $value;
        }
        elseif($methodName == 'get' && count($params) == 1)
        {
            $key = $params[0];
            if($key === 'settings') return $this->settings;
            if(array_key_exists($key, $this->settings)) return $this->settings[$key];
        }
        else
        {
            exit('Opps! The method is not defined!');
        }
    }
    
}