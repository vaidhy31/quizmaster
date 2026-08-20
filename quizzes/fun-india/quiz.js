export default {
  "name": "Fun India Quiz",
  "teams": [
    "Team A",
    "Team B",
    "Team C",
    "Team D"
  ],
  "rounds": [
    {
      "name": "General Knowledge",
      "questions": [
        {
          "type": "regular",
          "question": "What is the capital of India?",
          "answer": "New Delhi",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which planet is known as the Red Planet?",
          "options": [
            "Venus",
            "Mars",
            "Jupiter",
            "Mercury"
          ],
          "answer": 1,
          "points": 10
        },
        {
          "type": "regular",
          "question": "How many days are there in a leap year?",
          "answer": "366",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which is the largest ocean on Earth?",
          "options": [
            "Atlantic Ocean",
            "Indian Ocean",
            "Pacific Ocean",
            "Arctic Ocean"
          ],
          "answer": 2,
          "points": 10
        },
        {
          "type": "regular",
          "question": "What is the chemical symbol for gold?",
          "answer": "Au",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which animal is the fastest on land?",
          "options": [
            "Lion",
            "Horse",
            "Cheetah",
            "Greyhound"
          ],
          "answer": 2,
          "points": 10
        }
      ]
    },
    {
      "name": "India — Curious Why?",
      "questions": [
        {
          "type": "regular",
          "question": "Why is Independence Day celebrated on August 15 in India?",
          "answer": "India became independent from British rule on August 15, 1947.",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which Indian city is known as the Pink City?",
          "options": [
            "Jaipur",
            "Jodhpur",
            "Udaipur",
            "Bikaner"
          ],
          "answer": 0,
          "points": 10
        },
        {
          "type": "regular",
          "question": "What is the national animal of India?",
          "answer": "Bengal tiger",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which is the longest river in India?",
          "options": [
            "Ganga",
            "Godavari",
            "Yamuna",
            "Narmada"
          ],
          "answer": 0,
          "points": 10
        },
        {
          "type": "regular",
          "question": "Why is August 15 associated with Indian independence?",
          "answer": "It was the date chosen for the transfer of power and independence in 1947.",
          "points": 10
        },
        {
          "type": "multiple",
          "question": "Which Indian state has the longest coastline?",
          "options": [
            "Tamil Nadu",
            "Maharashtra",
            "Gujarat",
            "Andhra Pradesh"
          ],
          "answer": 2,
          "points": 10
        }
      ]
    },
    {
      "name": "Image Identification — India",
      "questions": [
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/taj-mahal.svg",
          "answer": "Taj Mahal",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/gateway-of-india.svg",
          "answer": "Gateway of India",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/india-gate.svg",
          "answer": "India Gate",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/hawa-mahal.svg",
          "answer": "Hawa Mahal",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/lotus-temple.svg",
          "answer": "Lotus Temple",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "full",
          "question": "Identify this image",
          "image": "./assets/mysore-palace.svg",
          "answer": "Mysore Palace",
          "points": 10
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/brihadeeswarar-temple.svg",
          "answer": "Brihadeeswarar Temple",
          "points": 10,
          "crop": {
            "x": 0.18,
            "y": 0.12,
            "width": 0.5,
            "height": 0.52
          }
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/golden-temple.svg",
          "answer": "Golden Temple",
          "points": 10,
          "crop": {
            "x": 0.42,
            "y": 0.18,
            "width": 0.34,
            "height": 0.46
          }
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/konark-sun-temple.svg",
          "answer": "Konark Sun Temple",
          "points": 10,
          "crop": {
            "x": 0.16,
            "y": 0.28,
            "width": 0.58,
            "height": 0.34
          }
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/qutub-minar.svg",
          "answer": "Qutub Minar",
          "points": 10,
          "crop": {
            "x": 0.36,
            "y": 0.1,
            "width": 0.3,
            "height": 0.58
          }
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/charminar.svg",
          "answer": "Charminar",
          "points": 10,
          "crop": {
            "x": 0.12,
            "y": 0.18,
            "width": 0.48,
            "height": 0.46
          }
        },
        {
          "type": "imageIdentification",
          "variant": "partial",
          "question": "Identify the full image",
          "image": "./assets/victoria-memorial.svg",
          "answer": "Victoria Memorial",
          "points": 10,
          "crop": {
            "x": 0.44,
            "y": 0.26,
            "width": 0.38,
            "height": 0.4
          }
        }
      ]
    }
  ],
  "teamTypes": {
    "Team A": "mixed",
    "Team B": "mixed",
    "Team C": "mixed",
    "Team D": "mixed"
  }
};
