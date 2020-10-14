<?php

class Word
{
    const DIR = "src/data";

    public $types = [];
    public $time = 0;
    public $name = '';

    public function __construct($types, $name)
    {
        $this->name = $name;
        $this->types = $types;
        $this->time = count($types);
    }

    public static function search($text)
    {
        $types = searchDirectoryIterator(self::DIR, $text);

        return new Word($types, $text);
    }
}

