import sys, json
import numpy as np
import skfuzzy as fuzz
import matplotlib.pyplot as plt
import csv

if __name__ == '__main__':
  arg = json.loads(sys.argv[1])

  # Generate universe variables
  x_service = np.arange(0, 11, 1)
  x_food = np.arange(0, 11, 1)
  x_tip = np.arange(0, 31, 1)

  # Generate fuzzy membership functions
  service_poor = fuzz.gaussmf(x_service, 0, 1.5)
  service_good = fuzz.gaussmf(x_service, 5, 1.5)
  service_excellent = fuzz.gaussmf(x_service, 10, 1.5)

  food_rancid = fuzz.trapmf(x_food, [0, 0, 1, 3])
  food_dellicious = fuzz.trapmf(x_food, [7, 8, 10, 10])

  tip_cheap = fuzz.trimf(x_tip, [0, 5, 10])
  tip_average = fuzz.trimf(x_tip, [10, 15, 20])
  tip_generous = fuzz.trimf(x_tip, [20, 25, 30])

  tip0 = np.zeros_like(x_tip)

  id = 0
  results = []

  for row in data:
    # Fuzzy membership functions activation
    food_level_rancid = fuzz.interp_membership(x_food, food_rancid, float(row['food']))
    food_level_dellicious = fuzz.interp_membership(x_food, food_dellicious, float(row['food']))

    service_level_poor = fuzz.interp_membership(x_service, service_poor, float(row['service']))
    service_level_good = fuzz.interp_membership(x_service, service_good, float(row['service']))
    service_level_excellent = fuzz.interp_membership(x_service, service_excellent, float(row['service']))

    # Rules
    active_rule1 = np.fmax(food_level_rancid, service_level_poor)

    # food == 'rancid' or service == 'poor' => tip == 'cheap'
    tip_activation_cheap = np.fmin(active_rule1, tip_cheap)

    # service == 'good' => tip == 'average'
    tip_activation_average = np.fmin(service_level_good, tip_average)

    # food == 'dellicious' or service == 'excellent' => tip == 'generous'
    active_rule3 = np.fmax(food_level_dellicious, service_level_excellent)
    tip_activation_generous = np.fmin(active_rule3, tip_generous)

    # Aggregate all three output membership functions together
    aggregated = np.fmax(tip_activation_cheap,
                         np.fmax(tip_activation_average, tip_activation_generous))

    # Calculate defuzzified result
    tip = fuzz.defuzz(x_tip, aggregated, 'centroid')
    tip_activation = fuzz.interp_membership(x_tip, aggregated, tip)

    results.append(tip)

    # Visualize this
    fig, ax0 = plt.subplots(figsize=(12, 6))

    ax0.set_ylim([0, 1.01])
    ax0.set_xlim([0, 31])
    ax0.plot(x_tip, tip_cheap, 'r', linewidth=0.8, label="poor")
    ax0.plot(x_tip, tip_average, 'b', linewidth=0.8, label="average")
    ax0.plot(x_tip, tip_generous, 'g', linewidth=0.8, label="generous")
    ax0.legend(framealpha=0.5)
    ax0.fill_between(x_tip, tip0, aggregated, facecolor='Orange', alpha=0.4)
    ax0.plot([tip, tip], [0, tip_activation], '#222', linewidth=1.5, alpha=0.9)
    ax0.set_title('Aggregated membership and result (line)')

    # Turn off top/right axes
    for ax in (ax0,):
      ax.spines['top'].set_visible(False)
      ax.spines['right'].set_visible(False)
      ax.get_xaxis().tick_bottom()
      ax.get_yaxis().tick_left()
      ax.tick_params(direction='out')

    ax0.set_ylabel('Membership')
    ax0.set_xlabel('Tip')

    plt.savefig("result" + str(id) + ".png")

    id = id + 1

  data_result = json.dumps({ 'data': results })

  print(data_result)
