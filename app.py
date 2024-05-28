from flask import Flask, request, jsonify, render_template
import pickle
import pandas as pd
import traceback

app = Flask(__name__)

# Tente carregar o modelo salvo no arquivo .pkl
try:
    with open('Treinamento/data/modelo_treinado.pkl', 'rb') as f:
        modelo = pickle.load(f)
except Exception as e:
    print(f"Erro ao carregar o modelo: {e}")
    print(traceback.format_exc())
    modelo = None

# Supondo que o dataframe 'heart_normalizacao' seja carregado a partir de um arquivo
heart_normalizacao = pd.read_csv('Treinamento/data/base_normalizada.csv')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/prever', methods=['POST'])
def prever():
    if modelo is None:
        return jsonify({'erro': 'Modelo não está disponível'}), 500
    
    dados = request.get_json(force=True)
    
    try:
        idade = dados['idade']
        sexo = dados['sexo']
        pressao_arterial = dados['pressao_arterial']
        colesterol = dados['colesterol']
        
        tipo_dor_toracica = 3
        acucar_sanguineo = 0
        resultados_eletrocardiograficos = 1
        frequencia_cardiaca_maxima = 150
        angina_exercicio = 0
        depressao_exercicio = 1.0
        inclincao_ST = 2
        numero_vasos_coloridos = 0
        thal = 3

        dados_de_entrada = [[
            idade, sexo, tipo_dor_toracica, pressao_arterial, colesterol,
            acucar_sanguineo, resultados_eletrocardiograficos, frequencia_cardiaca_maxima,
            angina_exercicio, depressao_exercicio, inclincao_ST, numero_vasos_coloridos, thal
        ]]
        
        previsao = modelo.predict(dados_de_entrada)
        return jsonify({'previsao': previsao[0]})
    except Exception as e:
        return jsonify({'erro': f'Erro ao processar a previsão: {e}'}), 500

@app.route('/dados_tratados', methods=['GET'])
def dados_tratados():
    try:
        data = heart_normalizacao.to_dict(orient='records')
        return jsonify(data)
    except Exception as e:
        return jsonify({'erro': f'Erro ao processar os dados: {e}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
