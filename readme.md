

Notas de versiones:


patrones de diseño:
Notas:
_ Renderizar texturas y objetos antes del inicio del mismo
_ Implica un void y un loop (concepto abstraído de Unity)
_ ¿pintura de objetos por capas? O ¿por bloques?
_ ¿Es más eficiente por bloques o por capas?

Por bloques se genera linealmente la posición de los elementos
no se sobreescribe ningún mapa de bits

Por capas se sobreescribe el mapa de bits relacionado con el área del objeto a pintar

Por bloques se pinta cíclicamente los sectores siendo (x/n), mayor número a pintar será el área de la pantalla que se le asignó

por capas solo se pintan los objetos que estén en pantalla, pero pueden ser un factor (x^n) 

sería mejor mezclar ambos tipos de graficado, para los objetos estáticos un drawing por bloques y para los que van en movimiento un drawin por capas 

_ sectores de construcción [
  - Obtención y generación de recursos
      (movimientos y colisiones condicionales) 
  - Lógica básica de los jugadores
   - Lógica básica de los objetos 
]

objeto con propiedades:
jugador (capas)
estático
interacción, eventos de interacción: 
estructura del objeto 
PROPIEDADES (JSON):
{
  "nombre": "nombre del objeto"
    Posición:{x:0, y:0}
  "posición":{
      "controlador": "estático" o por un jugador (player/this)
      "Interacción":"nombre del evento" 
       "imagen": "ruta de la imagen del objeto"
       "eventos":["al tocar", "al hacer click", "al presionar tecla", "move"]
       "script":"ruta del script del objeto para los eventos"
  }
}
IMAGEN
SCRIPT:
-void (cuando el juego se inicia)
-loop (ciclo de los frames)
-eventos

Con el fin de evitar lógica repetitiva, generar eventos estándar:
al tocar, 
al hacer click,
al presionar tecla, 
al para el mouse por encima
Nota: esta lógica debería ir en un archivo apartado para que se puedan más adelante agregar más eventos

Interacciones o físicas también deberían tener su lugar en la estructura
Física de caídas
Física de disparos
Animación de objetos

ESTRUCTURA DEL MAPA.js
estructurar posición de bloques,
este script iría en el apartado de resources, ya que se encarga de generar el mapa, incluyendo solo el método void
debe incluir un Array de objetos cuya composición es:

await Instancia los objetos => genero los recursos
mapa de posiciones
Método SCRIPTS:


-Aplicación a singleton (en cierto punto se convierte en un antipatron)

Variables Aplicadas:
-propiedades estáticas
-Implementación de propiedades estáticas

Infraestructura de la aplicación
-Game_Main

--libs

---interfaces
       _ Recursos (métodos)
       _ Logical (métodos)
       _ Draw (métodos)
--- local
      |- src
      |- recursos
      |- eventos
      |- lógica 
---mapas
        |--mapa 1
            |--config.json
            |--mapa.js
                   _ Recursos (métodos)
                   _ Logical (métodos)
                   _ Draw (métodos)
                |--objeto 
                    |--propiedades.json
                    |--imagen.png/jpg/bitmap ¿SVG?
                    