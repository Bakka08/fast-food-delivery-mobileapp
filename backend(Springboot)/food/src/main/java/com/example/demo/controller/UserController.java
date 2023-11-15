package com.example.demo.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.entity.Basket;
import com.example.demo.entity.Deliveryman;
import com.example.demo.entity.Meal;
import com.example.demo.entity.Order;
import com.example.demo.repository.BasketRepository;
import com.example.demo.repository.DeliverymanRepository;
import com.example.demo.repository.MealRepository;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	BasketRepository basketRepository;
	@Autowired
	MealRepository mealRepository;
	@Autowired
	OrderRepository orderRepository;
	@Autowired
	DeliverymanRepository deliverymanRepository;

	@GetMapping("/all")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable int id) {
		User user = userRepository.findById(id);
		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("updatepassword/{id}/{oldpassword}/{newpassword}")
	public int updatepassword(@PathVariable int id, @PathVariable String oldpassword,
			@PathVariable String newpassword) {
		User user = userRepository.findById(id);
		if (user.getPassword().equals(oldpassword)) {
			user.setPassword(newpassword);
			userRepository.save(user);
			return 1;

		}
		return 0;
	}
	
	@PutMapping("updatepasswordD/{id}/{oldpassword}/{newpassword}")
	public int updatepasswordD(@PathVariable int id, @PathVariable String oldpassword,
			@PathVariable String newpassword) {
		Deliveryman deliveryman = deliverymanRepository.findById(id);
		if (deliveryman.getPassword().equals(oldpassword)) {
			deliveryman.setPassword(newpassword);
			deliverymanRepository.save(deliveryman);
			return 1;

		}
		return 0;
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable int id) {
		User user = userRepository.findById(id);
		if (user != null) {
			userRepository.delete(user);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/login/{email}/{password}")
	public int getUserByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
		User user = userRepository.findByEmail(email);
		if (user != null && user.getPassword().equals(password)) {
			return user.getId();
		} else {
			return 0;
		}
	}

	@PostMapping("/signup")
	public String createUser(@RequestBody User user) {
		User u = userRepository.save(user);
		Basket b = new Basket(u.getId(), user, null, null, null, null);
		basketRepository.save(b);
		return "done ";

	}

	@GetMapping("find/{id}")
	public Basket getBasket(@PathVariable int id) {
		Basket basket = basketRepository.findById(id);

		return basket;
	}

	@GetMapping("addtobasket/{userid}/{mealid}")
	public String addMealToBasket(@PathVariable int userid, @PathVariable int mealid) {
		Meal meal = mealRepository.findById(mealid);
		Basket basket = basketRepository.findById(userid);

		if (basket != null && meal != null) {
			if (basket.getOptionalMeal3() == null) {
				basket.setOptionalMeal3(meal);
			} else if (basket.getOptionalMeal2() == null) {
				basket.setOptionalMeal2(meal);
			} else if (basket.getOptionalMeal1() == null) {
				basket.setOptionalMeal1(meal);
			} else if (basket.getMainMeal() == null) {
				basket.setMainMeal(meal);
			} else {
				return "Basket is full";
			}

			basketRepository.save(basket);
			return "Meal added to the basket";
		}

		return "Unable to add meal to the basket";
	}

	@DeleteMapping("removefrombasket/{userid}/{mealid}")
	public String removeMealFromBasket(@PathVariable int userid, @PathVariable int mealid) {
		Basket basket = basketRepository.findById(userid);
		Meal meal = mealRepository.findById(mealid);

		if (basket != null && meal != null) {
			if (basket.getOptionalMeal3() != null && basket.getOptionalMeal3().getId() == mealid) {
				basket.setOptionalMeal3(null);
			} else if (basket.getOptionalMeal2() != null && basket.getOptionalMeal2().getId() == mealid) {
				basket.setOptionalMeal2(null);
			} else if (basket.getOptionalMeal1() != null && basket.getOptionalMeal1().getId() == mealid) {
				basket.setOptionalMeal1(null);
			} else if (basket.getMainMeal() != null && basket.getMainMeal().getId() == mealid) {
				basket.setMainMeal(null);
			} else {
				return "Meal not found in the basket";
			}

			basketRepository.save(basket);
			return "Meal removed from the basket";
		}

		return "Unable to remove meal from the basket";
	}

	@GetMapping("addorder/{userid}/{longitude}/{latitude}")
	public String makeorder(@PathVariable int userid, @PathVariable String longitude, @PathVariable String latitude) {
		User user = userRepository.findById(userid);
		Basket basket = basketRepository.findById(userid);
		double total = 0.0; // Initialize the total to zero

		// Check if basket, main meal, and optional meals are not null before adding
		// their prices
		if (basket != null) {
			Meal mainMeal = basket.getMainMeal();
			Meal optionalMeal1 = basket.getOptionalMeal1();
			Meal optionalMeal2 = basket.getOptionalMeal2();
			Meal optionalMeal3 = basket.getOptionalMeal3();

			// Check if each meal is not null before adding its price
			if (mainMeal != null) {
				total += mainMeal.getPrice();
			}
			if (optionalMeal1 != null) {
				total += optionalMeal1.getPrice();
			}
			if (optionalMeal2 != null) {
				total += optionalMeal2.getPrice();
			}
			if (optionalMeal3 != null) {
				total += optionalMeal3.getPrice();
			}
		}

		Order order = new Order(latitude, longitude, user, basket.getMainMeal(), basket.getOptionalMeal1(),
				basket.getOptionalMeal2(), basket.getOptionalMeal3(), total);
		if (total != 0.0) {
			orderRepository.save(order);
			basket.setMainMeal(null);
			basket.setOptionalMeal1(null);
			basket.setOptionalMeal2(null);
			basket.setOptionalMeal3(null);
			basketRepository.save(basket);
			return "done";
		} else {
			return "empty";
		}

	}

	public String getAllOrdersnames(int itemid) {
		Order order = orderRepository.findById(itemid);

		if (order != null) {
			StringBuilder mealNames = new StringBuilder();

			if (order.getMainMeal() != null) {
				mealNames.append(order.getMainMeal().getName()).append(" - ");
			}
			if (order.getOptionalMeal1() != null) {
				mealNames.append(order.getOptionalMeal1().getName()).append(" - ");
			}
			if (order.getOptionalMeal2() != null) {
				mealNames.append(order.getOptionalMeal2().getName()).append(" - ");
			}
			if (order.getOptionalMeal3() != null) {
				mealNames.append(order.getOptionalMeal3().getName());
			}

			String concatenatedNames = mealNames.toString();

			if (concatenatedNames.endsWith(" - ")) {
				concatenatedNames = concatenatedNames.substring(0, concatenatedNames.length() - 3);
			}

			return concatenatedNames;
		} else {
			return "Order not found for the given order ID.";
		}
	}

	@GetMapping("/orders/{userid}")
	public List<Order> getAllOrders(@PathVariable int userid) {
		List<Order> orders = orderRepository.findAll();
		List<Order> userOrders = new ArrayList<>();

		for (Order order : orders) {
			if (order.getUser().getId() == userid) {
				order.setNames(getAllOrdersnames(order.getId()));
				userOrders.add(order);
			}
		}

		Collections.reverse(userOrders);

		return userOrders;
	}

	@GetMapping("/order/{id}")
	public Order getOrder(@PathVariable int id) {
		Order order = orderRepository.findById(id);

		return order;
	}
	
	@GetMapping("/loginD/{email}/{password}")
	public int getDByEmailAndPassword(@PathVariable String email, @PathVariable String password) {
		Deliveryman deliveryman = deliverymanRepository.findByEmail(email);
		if (deliveryman != null && deliveryman.getPassword().equals(password)) {
			return deliveryman.getId();
		} else {
			return 0;
		}
	}
	
	@GetMapping("/waitingOrders")
	public List<Order> getWaitingOrders() {
	    List<Order> allOrders = orderRepository.findAll();
	    List<Order> waitingOrders = new ArrayList<>();
	    String s ="WAITING FOR DELIVERY MAN TO ACCEPT";
	    for (Order order : allOrders) {
	        if (s.equals(order.getEtat())) {
				order.setNames(getAllOrdersnames(order.getId()));
	            waitingOrders.add(order);
	        }
	    }

	    return waitingOrders;
	}

	@GetMapping("/takeorder/{Deliverymanid}/{time}/{OrderId}/{lat}/{lon}")
	public int takeorder(@PathVariable int Deliverymanid, @PathVariable String time, @PathVariable int OrderId , @PathVariable String lat , @PathVariable String lon ) {
		Deliveryman deliveryman = deliverymanRepository.findById(Deliverymanid) ;
		deliveryman.setLatitude(lat);
		deliveryman.setLongitude(lon);
		deliverymanRepository.save(deliveryman);
		Order order = orderRepository.findById(OrderId);
		order.setTime(time);
		order.setDeliveryman(deliveryman);
		order.setEtat("IN THE WAY");
		orderRepository.save(order);
		return 0; 
	}
	
	@GetMapping("/ringbell/{OrderId}")
	public int ringbell( @PathVariable int OrderId  ) {
		Order order = orderRepository.findById(OrderId);
		order.setEtat("AT THE DOOR");
		orderRepository.save(order);
		return 0; 
	}
	
	@GetMapping("/scanqr/{qr}/{OrderId}")
	public int scanQr( @PathVariable String qr, @PathVariable int OrderId ) {
		Order order = orderRepository.findById(OrderId);
		if (order.getQR().equals(qr)) {
			order.setEtat("DELIVERED");
			orderRepository.save(order);
		}
		return 0; 
	}
}
