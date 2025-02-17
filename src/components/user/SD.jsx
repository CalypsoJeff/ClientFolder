
const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate input
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
  
      // Find the admin by email
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(400).json({ error: "Admin not found. Please register first." });
      }
  
      // Compare the provided password with the stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, admin.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ error: "Invalid credentials. Please try again." });
      }
  
      // Generate JWT tokens
      const { token, refreshToken } = generateToken(admin.name, admin.email, "admin");
  
      // Send the response
      return res.status(200).json({
        message: "Login successful!",
        token,
        refreshToken,
        admin,
      });
    } catch (error) {
      console.error("Error during admin login:", error);
      return res.status(500).json({ error: "An error occurred during login. Please try again later." });
    }
  };
  
  
  