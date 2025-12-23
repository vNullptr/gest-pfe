<?php

namespace App\Enums;

enum StatutStage: int
{
    case EN_ATTENTE = 0;
    case EN_COURS = 1;
    case TERMINE = 2;
}
