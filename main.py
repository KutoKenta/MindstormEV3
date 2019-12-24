import time
import json
from math import *

# import the navigation functions for the robot
from navigation import *

# import the Alexa Gadgets Toolkit so the robot can communicate with an Alexa device
from agt import AlexaGadget

# import the required libraries to interface with the EV3 hardware components
from ev3dev2.motor import LargeMotor, MediumMotor
from ev3dev2.sensor.lego import ColorSensor, InfraredSensor
from ev3dev2.led import Leds


# a basic class to handle PID control behavior
class PID:
    kp, kd = 0, 0
    e0 = 0

    def __init__(self, kp=0, kd=0):
        self.kp = kp
        self.kd = kd

    def calculate(self, e):
        v = self.kp * e + (e - self.e0) * self.kd
        self.e0 = e
        return v

# main class that handles all of the robot behaviors controlled through the Alexa Skill
class Robot(AlexaGadget):
    def __init__(self):
        super().__init__()

        # initialize all of the motors
        print('Initializing devices')
        self.leds = Leds()
        self.motor_hand = LargeMotor(address='outA')
        self.motor_claw = MediumMotor(address='outC')

    # called when the EV3 brick connects to an Alexa device
    def on_connected(self, device_addr):
        self.leds.set_color('LEFT', 'GREEN')
        self.leds.set_color('RIGHT', 'GREEN')
        print("{} connected to Echo device".format(self.friendly_name))

    # called when the EV3 brick disconnects from an Alexa device
    def on_disconnected(self, device_addr):
        self.leds.set_color('LEFT', 'BLACK')
        self.leds.set_color('RIGHT', 'BLACK')
        print("{} disconnected from Echo device".format(self.friendly_name))

    # the function called to receive gadget control directives from the Alexa Skill through the connected Alexa device
    def on_custom_mindstorms_gadget_control(self, directive):
        # decode the directive payload into a JSON object
        payload = json.loads(directive.payload.decode("utf-8"))
        print("Control payload: {}".format(payload))

        # determine which command to be executed
        control_type = payload['type']
        if control_type == 'Go':
            # get the source and destination states for this command
            src_state = State[payload['state']]
            self.motors_claw.on(20)
            time.sleep(2)
            self.motors_claw.off(brake=True)

        elif control_type == 'Back':
            # get the source and destination states for this command
            src_state = State[payload['state']]
            self.motors_claw.on(-20)
            time.sleep(2)
            self.motors_claw.off(brake=True)

          

        elif control_type == 'Left':
            # get the source and destination states for this command
            src_state = State[payload['state']]
            self.motors_hand.on(20)
            time.sleep(2)
            self.motors_hand.off(brake=True)

          

        elif control_type == 'Right':
            # get the source and destination states for this command
            src_state = State[payload['state']]
            self.motors_hand.on(-20)
            time.sleep(2)
            self.motors_hand.off(brake=True)

          
        elif control_type == 'Turn':
            # get the source and destination states for this command
            src_state = State[payload['state']]
            while(danceflag == 1):
                self.motors_hand.on(20)
                time.sleep(2)
                self.motors_hand.on(-20)
            self.motors_hand.off(brake=True)

    # move the robot straight back at a certain speed for a certain number of rotations
    def move_back(self, speed=0.2, distance=1.6):
        self.motor_left.on_for_rotations(round(speed * 100),
                                         distance,
                                         block=False)
        self.motor_right.on_for_rotations(round(speed * 100), distance)

 
    # turn off all motors and lights
    def poweroff(self):
        self.motor_hand.off(brake=False)
        self.motor_claw.off(brake=False)

# called at program startup
def main():
    # create a robot instance
    robot = Robot()

    # run the main function to handle Alexa Gadget code
    robot.main()

    # poweroff after the execution has been completed (or program exited)
    robot.poweroff()


if __name__ == '__main__':
    main()
