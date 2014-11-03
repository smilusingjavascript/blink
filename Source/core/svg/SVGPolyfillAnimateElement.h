// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillAnimateElement_h
#define SVGPolyfillAnimateElement_h

#include "core/svg/SVGPolyfillAnimationElement.h"

namespace blink {

class SVGPolyfillAnimateElement : public SVGPolyfillAnimationElement {
    DEFINE_WRAPPERTYPEINFO();
public:
    DECLARE_NODE_FACTORY(SVGPolyfillAnimateElement);

private:
    explicit SVGPolyfillAnimateElement(Document&);
};

} // namespace blink

#endif // SVGPolyfillAnimateElement_h
