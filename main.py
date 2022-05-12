import numpy as np
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow import keras


MODEL_PATH = './model_save'
CLASSES = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
          'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

def main():
    img_path = "./uploads/crop.jpg"

    img = keras.preprocessing.image.load_img(img_path)
    img = img.resize((200, 200))
    img = keras.preprocessing.image.img_to_array(img).reshape((1, 200, 200, 3))

    model = keras.models.load_model(MODEL_PATH)
    print(CLASSES[np.argmax(model.predict(img))])


# print(model.predict(img))


if __name__ == '__main__':
    main()