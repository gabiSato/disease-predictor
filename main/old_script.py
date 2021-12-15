
import sys, json
import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import matplotlib.pyplot as plt


if __name__ == '__main__':
  # param = sys.stdin.readlines()

  # file = open(param, newline='')

  # data = csv.DictReader(file)

  # print(json.loads(param[0]))
  arg = json.loads(sys.argv[1])

  service = ctrl.Antecedent(np.arange(0, 10, 1), 'service')
  food = ctrl.Antecedent(np.arange(0, 10, 1), 'food')
  tip = ctrl.Consequent(np.arange(0, 30, 1), 'tip')

  service['poor'] = fuzz.gaussmf(service.universe, 0, 1.5)
  service['good'] = fuzz.gaussmf(service.universe, 5, 1.5)
  service['excellent'] = fuzz.gaussmf(service.universe, 10, 1.5)
  # service.view()

  food['rancid'] = fuzz.trapmf(food.universe, [0, 0, 1, 3])
  food['dellicious'] = fuzz.trapmf(food.universe, [7, 8, 10, 10])
  # food.view()

  tip['cheap'] = fuzz.trimf(tip.universe, [0, 5, 10])
  tip['average'] = fuzz.trimf(tip.universe, [10, 15, 20])
  tip['generous'] = fuzz.trimf(tip.universe, [20, 25, 30])
  # tip.view()

  rule1 = ctrl.Rule(service['poor'] | food['rancid'], tip['cheap'])
  rule2 = ctrl.Rule(service['good'], tip['average'])
  rule3 = ctrl.Rule(service['excellent'] | food['dellicious'], tip['generous'])

  tip_ctrl = ctrl.ControlSystem([rule1, rule2, rule3])
  tip_simulator = ctrl.ControlSystemSimulation(tip_ctrl)

  id = 0
  results = []

  for row in arg['data']:
    input = {
      'food': float(row['food']),
      'service': float(row['service'])
    }

    tip_simulator.inputs(input)

    tip_simulator.compute()

    new_value = row.copy()

    new_value['id'] = id
    new_value['result'] = tip_simulator.output['tip']

    results.append(new_value)

    service.view(sim=tip_simulator)
    food.view(sim=tip_simulator)
    tip.view(sim=tip_simulator)

    plt.savefig(r'assets\images\service' + str(id) + '.png')
    plt.savefig(r'assets\images\food' + str(id) + '.png')
    plt.savefig(r'assets\images\tip' + str(id) + '.png')

    id = id + 1

  data_result = json.dumps({ 'data': results })
  print(data_result)
