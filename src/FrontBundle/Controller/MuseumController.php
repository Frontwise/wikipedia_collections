<?php

namespace FrontBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Response;
use AppBundle\Controller\BaseController;

class MuseumController extends BaseController
{
    
    
    /**
     * @Route("/museum/{id}/{name}", defaults={"name"=""}, name="museum_show")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();
        $museum = $em->getRepository('AppBundle:Museum')->find($id);
        $this->checkExists($museum);
        
        return [
            'museum' => $museum,
        ];
    }
    
}