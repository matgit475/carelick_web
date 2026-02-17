<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class PublicService{
        private $newsRepository;
        private $eventRepository;
        private $eventGalleryRepository;
        private $defaultImage = '555555.png';

        public function __construct($newsRepository, $eventRepository, $eventGalleryRepository) {
            $this->newsRepository = $newsRepository;
            $this->eventRepository = $eventRepository;
            $this->eventGalleryRepository = $eventGalleryRepository;
        }

        private function normalizeEventImage($event) {
            if ($event['event_image'] === "NA") {
                $event['event_image'] = $this->defaultImage;
            } 
            return $event;
        }
        
        public function events(){
            return array_map([$this, 'normalizeEventImage'], $this->eventRepository->getEvents());
        }

        public function home() {
            return [
                "news"=> $this->newsRepository->getActiveNews(), 
                "past_events"=>$this->eventRepository->getPastEvents(),
                "upcomming_events"=>$this->eventRepository->getUpcommingEvents()
            ];
        }

        public function news(){
            return $this->newsRepository->getActiveNews();
        }

        public function event($id){
            return [
                "event" =>$this->normalizeEventImage($this->eventRepository->find($id)),
                "event_gallery"=> $this->eventGalleryRepository->findByEventId($id),
                "past_events"=>$this->eventRepository->getPastEvents()
            ];
        }
    }
?>