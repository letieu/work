<?php

class Word
{
    const DIR = "src/data";

    public $types = [];
    public $time = 0;

    public function __construct($types)
    {
        $this->types = [];
        foreach ($types as $type) {
            if ($this->types[$type]) {
                $this->types[$type] ++;
            } else {
                $this->types[$type] = 1;
            }
        }

        $this->time = count($types);
    }

    public static function search($text)
    {
        $types = searchDirectoryIterator(self::DIR, $text);

        return new Word($types);
    }
}

