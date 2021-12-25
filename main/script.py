import sys, json
import numpy as np
import skfuzzy as fuzz
import matplotlib.pyplot as plt
import base64
import os

if __name__ == '__main__':
  arg = json.loads(sys.argv[1])

  # Tamanho do intervalo de x pra cada variável
  x_prevalencia = np.linspace(0, 1.01)
  x_idh = np.linspace(0, 1.01)
  x_qes = np.arange(0, 5000, 1)
  x_doenca = np.linspace(0, 1.01)

  # Declaração das funções de cada membro das variáveis
  prevalencia_muito_baixo = fuzz.gaussmf(x_prevalencia, 0, 0.1)
  prevalencia_baixo = fuzz.gaussmf(x_prevalencia, 0.3, 0.1)
  prevalencia_moderado = fuzz.gaussmf(x_prevalencia, 0.5, 0.1)
  prevalencia_alto = fuzz.gaussmf(x_prevalencia, 0.7, 0.1)
  prevalencia_muito_alto = fuzz.gaussmf(x_prevalencia, 0.9, 0.1)

  idh_muito_baixo = fuzz.gaussmf(x_idh, 0.350, 0.1)
  idh_baixo = fuzz.gaussmf(x_idh, 0.55, 0.1)
  idh_moderado = fuzz.gaussmf(x_idh, 0.7, 0.1)
  idh_alto = fuzz.gaussmf(x_idh, 0.8, 0.1)
  idh_muito_alto = fuzz.gaussmf(x_idh, 0.9, 0.1)

  qes_muito_baixo = fuzz.gaussmf(x_qes, 200, 200)
  qes_baixo = fuzz.gaussmf(x_qes, 500, 200)
  qes_moderado = fuzz.gaussmf(x_qes, 1000, 200)
  qes_alto = fuzz.gaussmf(x_qes, 2000, 200)
  qes_muito_alto = fuzz.gaussmf(x_qes, 4000, 200)

  doenca_muito_baixo = fuzz.gaussmf(x_doenca, 0.1, 0.1)
  doenca_baixo = fuzz.gaussmf(x_doenca, 0.4, 0.1)
  doenca_moderado = fuzz.gaussmf(x_doenca, 0.6, 0.1)
  doenca_alto = fuzz.gaussmf(x_doenca, 0.8, 0.1)
  doenca_muito_alto = fuzz.gaussmf(x_doenca, 1, 0.1)

  # Intervalo de x para a variável de saída preenchido com o valor 0 em Y
  doenca0 = np.zeros_like(x_doenca)

  id = 0
  results = []

  for row in arg['data']:
    # Geração dos dados de Xn, Yn para cada membro da variável relacionado ao dado de entrada
    lvl_prevalencia_muito_baixo = fuzz.interp_membership(x_prevalencia, prevalencia_muito_baixo, float(row['prevalencia']))
    lvl_prevalencia_baixo = fuzz.interp_membership(x_prevalencia, prevalencia_baixo, float(row['prevalencia']))
    lvl_prevalencia_moderado = fuzz.interp_membership(x_prevalencia, prevalencia_moderado, float(row['prevalencia']))
    lvl_prevalencia_alto = fuzz.interp_membership(x_prevalencia, prevalencia_alto, float(row['prevalencia']))
    lvl_prevalencia_muito_alto = fuzz.interp_membership(x_prevalencia, prevalencia_muito_alto, float(row['prevalencia']))

    lvl_idh_muito_baixo = fuzz.interp_membership(x_idh, idh_muito_baixo, float(row['idh']))
    lvl_idh_baixo = fuzz.interp_membership(x_idh, idh_baixo, float(row['idh']))
    lvl_idh_moderado = fuzz.interp_membership(x_idh, idh_moderado, float(row['idh']))
    lvl_idh_alto = fuzz.interp_membership(x_idh, idh_alto, float(row['idh']))
    lvl_idh_muito_alto = fuzz.interp_membership(x_idh, idh_muito_alto, float(row['idh']))

    lvl_qes_muito_baixo = fuzz.interp_membership(x_qes, qes_muito_baixo, float(row['qes']))
    lvl_qes_baixo = fuzz.interp_membership(x_qes, qes_baixo, float(row['qes']))
    lvl_qes_moderado = fuzz.interp_membership(x_qes, qes_moderado, float(row['qes']))
    lvl_qes_alto = fuzz.interp_membership(x_qes, qes_alto, float(row['qes']))
    lvl_qes_muito_alto = fuzz.interp_membership(x_qes, qes_muito_alto, float(row['qes']))

    # Regras
    active_rule1 = np.fmin(lvl_qes_alto, lvl_idh_alto)
    active_rule2 = np.fmin(lvl_qes_alto, lvl_prevalencia_baixo)
    active_rule3 = np.fmax(lvl_prevalencia_alto, lvl_idh_muito_baixo)

    # Funções de ativação para cada saída
    doenca_ativacao_muito_baixo = np.fmin(active_rule1, doenca_muito_baixo)
    # qes == 'alto' and lvl == 'baixo' => doenca == 'baixo'
    doenca_ativacao_baixo = np.fmin(active_rule2, doenca_baixo)
    doenca_ativacao_moderado = np.fmin(lvl_prevalencia_alto, doenca_moderado)
    doenca_ativacao_alto = np.fmin(lvl_prevalencia_alto, doenca_alto)
    doenca_ativacao_muito_alto = np.fmin(active_rule3, doenca_muito_alto)

    # Agregação de todas as funções de ativação
    aggregated = np.fmax(doenca_ativacao_muito_baixo, np.fmax(doenca_ativacao_baixo, np.fmax(doenca_ativacao_moderado, np.fmax(doenca_ativacao_alto, doenca_ativacao_muito_alto))))

    # Resultado da defuzzificado
    doenca = fuzz.defuzz(x_doenca, aggregated, 'centroid')

    # Dados de Xn, Yn gerados a partir do valor de x, y e da função de agregação
    doenca_activation = fuzz.interp_membership(x_doenca, aggregated, doenca)

    new_value = row.copy()
    new_value['id'] = id
    new_value['result'] = doenca

    # Geração do gráfico final
    plt.rc('figure', max_open_warning = 0)

    fig, ax0 = plt.subplots(figsize=(12, 6))

    ax0.set_ylim([0, 1.01])
    ax0.set_xlim([0, 1.01])
    ax0.plot(x_doenca, doenca_muito_baixo, 'r', linewidth=0.8, label='muito baixo')
    ax0.plot(x_doenca, doenca_baixo, 'Orange', linewidth=0.8, label='baixo')
    ax0.plot(x_doenca, doenca_moderado, 'Yellow', linewidth=0.8, label='moderado')
    ax0.plot(x_doenca, doenca_alto, 'b', linewidth=0.8, label='alto')
    ax0.plot(x_doenca, doenca_muito_alto, 'g', linewidth=0.8, label='muito alto')
    ax0.legend(framealpha=0.5)
    ax0.fill_between(x_doenca, doenca0, aggregated, facecolor='m', alpha=0.4)
    ax0.plot([doenca, doenca], [0, doenca_activation], '#222', linewidth=1.5, alpha=0.9)
    ax0.set_title('Leishmaniose Tegumentar Americana')

    # Turn off top/right axes
    for ax in (ax0,):
      ax.spines['top'].set_visible(False)
      ax.spines['right'].set_visible(False)
      ax.get_xaxis().tick_bottom()
      ax.get_yaxis().tick_left()
      ax.tick_params(direction='out')

    ax0.set_ylabel('Associações')
    ax0.set_xlabel('LTA')

    plt.savefig('assets\chart_image.png')

    with open('assets\chart_image.png', "rb") as f:
      encoded_image = base64.b64encode(f.read())
      new_value['image'] = encoded_image.decode("ascii")
      f.close()

    results.append(new_value)
    os.remove('assets\chart_image.png')

    id = id + 1

  data_result = json.dumps({ 'data': results })
  print(data_result)
