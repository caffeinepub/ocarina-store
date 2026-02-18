import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  // Initialize the authorization system state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Product Management
  public type Product = {
    title : Text;
    description : Text;
    price : Nat;
    imageReference : Text;
  };

  let products = Map.empty<Text, Product>();

  public shared ({ caller }) func createProduct(id : Text, title : Text, description : Text, price : Nat, imageReference : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create products");
    };

    if (products.containsKey(id)) {
      Runtime.trap("Product with this ID already exists");
    };

    let product : Product = {
      title;
      description;
      price;
      imageReference;
    };

    products.add(id, product);
  };

  public shared ({ caller }) func updateProduct(id : Text, title : Text, description : Text, price : Nat, imageReference : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };

    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?_) {
        let updatedProduct : Product = {
          title;
          description;
          price;
          imageReference;
        };
        products.add(id, updatedProduct);
      };
    };
  };

  public query func listProducts() : async [(Text, Product)] {
    products.toArray();
  };

  public query func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };
};
