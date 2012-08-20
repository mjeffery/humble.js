describe("A base object that", function() {
	
	describe("supports inheritance", function() {
		
		it("can be extended", function() {
			var base, subclass, a, b, c;
			
			base = humble.Object.extend({ foo: true });
			subclass = base.extend({ bar: true });
			
			a = new humble.Object();
			b = new base();
			c = new subclass();
			
			expect(a.foo).toBe(undefined);
			expect(a.bar).toBe(undefined);
			expect(b.foo).toBe(true);
			expect(b.bar).toBe(undefined);
			expect(c.foo).toBe(true);
			expect(c.bar).toBe(true);
		});
		
		it("allows methods and properties to be overridden", function() {
			var base, subclass, a, b;
			
			base = humble.Object.extend({
				prop: 'base',
				method: function() { return 'base' }
			});
			
			subclass = base.extend({
				prop: 'subclass',
				method: function() { return 'subclass' }
			});
			
			a = new base();
			b = new subclass();
			
			expect(a.prop).toBe('base');
			expect(a.method()).toBe('base');
			expect(b.prop).toBe('subclass');
			expect(b.method()).toBe('subclass');
		});
		
		it('provides the "_super" property to access an overridden method', function() {
			var base, subclass, a, b;
			
			base = humble.Object.extend({ value: function() { return 5 } });
			subclass = base.extend( { value: function() { return this._super() + 10 } });
			
			a = new base();
			b = new subclass();
			
			expect(a.value()).toBe(5);
			expect(b.value()).toBe(15);
		});
		
	});
	
	describe("can define a constructor", function() {
		
		var base, subclass, a, b;
		
		beforeEach(function() {
			base = humble.Object.extend({
				init: function(value) { this._value = value; },
				value: function() { return arguments.length > 0 ? this._value = arguments[0] : this._value }
			});
			
			subclass = base.extend({
				init: function(value) { this._super(value + 10); }
			});
		});
		
		it("with arguments", function() {
			a = new base('a');
			b = new base('b');
			
			expect(a.value()).toBe('a');
			expect(b.value()).toBe('b');
		});
		
		it("that can be overridden", function() {
			a = new base(5);
			b = new subclass(5);
			
			expect(a.value()).toBe(5);
			expect(b.value()).toBe(15);
		});
		
		it("can be invoked anonymously", function() {
			base = humble.Object.extend({
				init: function(value) { this._value = value; },
				value: function() { return arguments.length > 0 ? this._value = arguments[0] : this._value }
			});
			
			a = base.invoke(5);
			
			expect(a.value()).toBe(5);
		});
	});
	
	it("has an equals method", function() {
		var a, b;
		
		a = new humble.Object();
		b = new humble.Object();
		
		expect(a.equals(b)).not.toBe(true);
		expect(a.equals(a)).toBe(true);
	});
});
